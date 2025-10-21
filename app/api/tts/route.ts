import { type NextRequest, NextResponse } from 'next/server';
import prompts from "../../../lib/openai/prompts.json" assert { type: "json" };
import OpenAI from "openai";
import fs from "fs";
import path from "path";

// FIXME: Where should this live?
const openai = new OpenAI();

// https://nextjs.org/docs/app/api-reference/file-conventions/route#streaming

export async function GET() {
  d
  return NextResponse.json({ message: 'Text-to-Speech endpoint' });
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    const processedOutput = await convertTextToSpeechOpenAI(text);

    if (!processedOutput.id) {
      return NextResponse.json({ error: processedOutput }, { status: 400 });
    }

    return NextResponse.json(processedOutput, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// TODO: Add status check route '/status'


/****************OLD CODE ******************************************/
// POST /v2/tts
// OpenAI API
// export const convertTextToSpeechControllerV2 = async (req, res) => {
//   const { text } = req.body;
//   try {
//     const processedOutput = await convertTextToSpeechOpenAI(text);
//     if (!processedOutput.id) {
//       return res.status(500).json({ error: processedOutput });
//     }
//     return res.json(processedOutput);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

/**
 * Main function to process newletter content into script then create audio file
 * @param {String} emailContent
 */
const convertTextToSpeechOpenAI = async (emailContent: string): Promise<{ id: string; message: string; filePath: string }> => {
  try {

    // generate script
    const openaiResponse = await generateScript(emailContent);
    console.log(openaiResponse); // FIXME: remove after testing
    const { id, scriptContent } = openaiResponse;

    if (!scriptContent) {
      throw new Error("Error in generating script");
    }

    // convert script to speech
    const audioResults = await convertScriptToSpeech(id, scriptContent);
    if (!audioResults.filePath) {
      throw new Error("Error in converting script to speech");
    }

    // return audio file path
    return audioResults;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error in convertTextToSpeechOpenAI:", message);
    throw new Error(message);
  }
};

/**
 * Creates a script based on the email newsletter content
 * @param {string} originalNewsletterContent
 * @returns {object} response object containing the script content and meta data
 */
const generateScript = async (originalNewsletterContent: string) => {
  // OpenAI API call to generate script
  // https://platform.openai.com/docs/guides/text-generation
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "developer",
        content: prompts.systemMessage.generateScriptPromptV1,
      },
      {
        role: "user",
        content: originalNewsletterContent,
      },
    ],
    store: true,
  });

  // download response object into json file for logs
  downloadOutputFile(completion);

  console.log("Successfully downloaded script file: ", completion.id);

  // return script content
  return {
    id: completion.id,
    message: "Script generated",
    usage: completion.usage,
    scriptContent: completion.choices[0].message.content,
  };
};

// FIXME: We should not be writing files to the local filesystem like this, should be placed in an object store
/**
 * Download response object from API call into file (json)
 * @param {object} data - json data from API response
 */
const downloadOutputFile = (data: any) => {
  if (!data.id) throw new Error("Download failed");

  const id = data.id;
  const jsonData = JSON.stringify(data, null, 2);

  // Save to a temp or storage folder at the project root
  const dirPath = path.join(process.cwd(), "output");
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

  const filePath = path.join(dirPath, `${getCurrentDateWithTime()}_${id}.json`);
  fs.writeFileSync(filePath, jsonData);

  console.log(`File downloaded at ${filePath}`);
  return { id, message: "File downloaded successfully", filePath };
};

/**
 * Function to convert generated script into audio using OpenAI's tts-1 model
 * @param {String} scriptContent
 */
const convertScriptToSpeech = async (id: string, scriptContent: string): Promise<{ id: string; message: string; filePath: string }> => {
  // OpenAI API call to generate audio from script
  try {
    const audio = await openai.audio.speech.create({
      model: "tts-1",
      voice: "sage",
      input: scriptContent,
      response_format: "wav",
    });
    console.log("Tried to convert script to speech:", audio.ok);

    // download audio file into output directory
    const downloadResults = await downloadAudioFileFromBuffer(id, audio);
    if (!downloadResults.filePath) {
      throw new Error("Error in downloading file");
    }
    console.log("\nDownloaded File:", downloadResults.filePath);
    return downloadResults;
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("Error in convertScriptToSpeech:", message);
    throw new Error(message);
  }
};

/**
 * Function to download text-to-speech wav file from buffer object
 * @param {String} id - request id from tts model (not the script)
 * @param {Buffer} buff - audio buffer object
 * @returns object containing the file path
 */
export const downloadAudioFileFromBuffer = async (
  id: string,
  buff: Buffer | ArrayBuffer,
) => {
  if (!id || !buff) throw new Error("Invalid arguments for audio download");

  // Create a stable output directory (not inside /src)
  const outputDir = path.join(process.cwd(), "output", "audio");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Construct a timestamped filename
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `${timestamp}_${id}.wav`;
  const filePath = path.join(outputDir, filename);

  // Convert to Node.js buffer if necessary
  const bufferData = buff instanceof Buffer ? buff : Buffer.from(await buff.arrayBuffer());
  await fs.promises.writeFile(filePath, bufferData);

  console.log(`✅ Audio file written to ${filePath}`);

  return {
    id,
    message: "File downloaded successfully",
    filePath,
  };
};

/**
 * Get current date string in format yyyy-mm-dd--hh-mm
 * @returns {String} current date
 */
export const getCurrentDateWithTime = () => {
	const dt = new Date();
	const zonedDateParts = new Intl.DateTimeFormat("en-US", {
		timeZone: "America/New_York",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	}).formatToParts(dt);

	const dateData = {};
	zonedDateParts.forEach(({ type, value }) => {
		dateData[type] = value;
	});

	const dateString = `${dateData.year}-${dateData.month}-${dateData.day}_${dateData.hour}:${dateData.minute}`;
	return dateString;
};