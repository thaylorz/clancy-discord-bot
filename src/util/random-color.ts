import { ColorResolvable } from 'discord.js';

const randomColor = (): ColorResolvable => `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;

export default randomColor;
