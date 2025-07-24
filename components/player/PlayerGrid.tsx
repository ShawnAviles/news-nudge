import styled from "@emotion/styled";

export const PlayerGrid = styled("div")`
	display: grid;
	row-gap: 0.5rem;
	column-gap: 0.5rem;

	/* Mobile first */
	grid-template-areas:
		"seekBar seekBar seekBar seekBar seekBar seekBar"
		"currentTime none    none    playbackSpeed link currentTime"
		"volume    prev      backward play    forward   next";
	grid-template-columns: repeat(6, 1fr);

	@media (min-width: 768px) {
		/* Desktop */
		grid-template-areas:
			"seekBar seekBar seekBar seekBar seekBar seekBar seekBar seekBar"
			"currentTime none    none    none    none    none     totalTime totalTime"
			"volume    prev      backward play    forward   next     playbackSpeed link";
		grid-template-columns: 50px 1fr auto auto auto 1fr auto auto;
	}
`;
