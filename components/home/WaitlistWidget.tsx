// docs: https://getwaitlist.com/docs/nocode/react

"use client";

import { useEffect, useRef } from "react";

export default function WaitlistWidget() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Only run on client-side
		if (!containerRef.current) return;

		// Create link element
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.type = "text/css";
		link.href =
			"https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.css";
		document.head.appendChild(link);

		// Create script element
		const script = document.createElement("script");
		script.src =
			"https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.js";
		script.async = true;

		// Append script to body
		document.body.appendChild(script);

		// Clean up function
		return () => {
			document.head.removeChild(link);
			if (document.body.contains(script)) {
				document.body.removeChild(script);
			}
		};
	}, []);

	return (
		<div
			id="getWaitlistContainer"
			ref={containerRef}
			data-waitlist_id="29593"
			data-widget_type="WIDGET_2"
			className="!text-2xl"
		></div>
	);
}
