
// Taken from https://github.com/iwillreku3206/minecraft-formatted-text-react/blob/main/src/components/MinecraftText.tsx
// which has an MIT license


import React from 'react'

export interface Props {
	colors?: ColorMap
	prefix?: string
	children?: string
}

type ColorType =
	| 'black'
	| 'dark_blue'
	| 'dark_green'
	| 'dark_aqua'
	| 'dark_red'
	| 'dark_purple'
	| 'gold'
	| 'gray'
	| 'dark_gray'
	| 'blue'
	| 'green'
	| 'aqua'
	| 'red'
	| 'light_purple'
	| 'yellow'
	| 'white'

export type ColorMap = { [key in ColorType]: string }

const defaultColors: ColorMap = {
	black: '#000000',
	dark_blue: '#0000AA',
	dark_green: '#00AA00',
	dark_aqua: '#00AAAA',
	dark_red: '#AA0000',
	dark_purple: '#AA00AA',
	gold: '#FFAA00',
	gray: '#AAAAAA',
	dark_gray: '#555555',
	blue: '#5555FF',
	green: '#55FF55',
	aqua: '#55FFFF',
	red: '#FF5555',
	light_purple: '#FF55FF',
	yellow: '#FFFF55',
	white: '#FFFFFF'
}

type ColorLetter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0

const letterMap: { [key in ColorLetter]: keyof ColorMap } = {
	0: 'black',
	1: 'dark_blue',
	2: 'dark_green',
	3: 'dark_aqua',
	4: 'dark_red',
	5: 'dark_purple',
	6: 'gold',
	7: 'gray',
	8: 'dark_gray',
	9: 'blue',
	a: 'green',
	b: 'aqua',
	c: 'red',
	d: 'light_purple',
	e: 'yellow',
	f: 'white'
}

export default function MinecraftText(props: Props) {
	let { prefix } = props
	const { children } = props
	prefix = prefix ? prefix : '&'

	const segments = (`${prefix}r${children}` || `${prefix}r`).split(new RegExp(`(?=${prefix}r)`, 'g'))
	return (
		<div>
			{segments.map((segment, index) => (
				<MinecraftInnerText key={index} {...props}>
					{segment}
				</MinecraftInnerText>
			))}
		</div>
	)
}

function MinecraftInnerText(props: Props) {
	let { prefix } = props
	const { colors, children } = props
	prefix = prefix ? prefix : '&'

	const segments = (children || '').split(new RegExp(`(?=${prefix})`, 'g'))

	const color = new RegExp(`^${prefix}[0-9a-f].*`)
	const bold = new RegExp(`^${prefix}[l].*`)
	const italic = new RegExp(`^${prefix}[o].*`)
	const underline = new RegExp(`^${prefix}[n].*`)
	const strikethrough = new RegExp(`^${prefix}[m].*`)
	const reset = new RegExp(`^${prefix}[r].*`)

	const segment = segments[0]

	if (color.test(segment)) {
		return (
			<span
				style={{
					color: (colors || defaultColors)[letterMap[segment[1] as ColorLetter]],
					fontFamily: 'Minecraft, sans-serif',
				}}>
				{segment.substring(2)}
				<MinecraftInnerText {...props}>{segments.slice(1).join('')}</MinecraftInnerText>
			</span>
		)
	} else if (bold.test(segment)) {
		return (
			<span
				style={{
					fontWeight: 'bold',
					fontFamily: 'Minecraft, sans-serif'
				}}>
				{segment.substring(2)}
				<MinecraftInnerText {...props}>{segments.slice(1).join('')}</MinecraftInnerText>
			</span>
		)
	} else if (italic.test(segment)) {
		return (
			<span
				style={{
					fontStyle: 'italic',
					fontFamily: 'Minecraft, sans-serif'
				}}>
				{segment.substring(2)}
				<MinecraftInnerText {...props}>{segments.slice(1).join('')}</MinecraftInnerText>
			</span>
		)
	} else if (underline.test(segment)) {
		return (
			<span
				style={{
					textDecoration: 'underline',
					fontFamily: 'Minecraft, sans-serif'
				}}>
				{segment.substring(2)}
				<MinecraftInnerText {...props}>{segments.slice(1).join('')}</MinecraftInnerText>
			</span>
		)
	} else if (strikethrough.test(segment)) {
		return (
			<span
				style={{
					textDecoration: 'line-through',
					fontFamily: 'Minecraft, sans-serif'
				}}>
				{segment.substring(2)}
				<MinecraftInnerText {...props}>{segments.slice(1).join('')}</MinecraftInnerText>
			</span>
		)
	} else if (reset.test(segment)) {
		return (
			<span
				style={{
					fontStyle: 'initial',
					textDecoration: 'none',
					color: 'white',
					fontWeight: 'initial',
					fontFamily: 'Minecraft, sans-serif'
				}}>
				{segment.substring(2)}
				<MinecraftInnerText {...props}>{segments.slice(1).join('')}</MinecraftInnerText>
			</span>
		)
	} else {
		return <span>{segment}</span>
	}
}