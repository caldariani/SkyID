var sia = require('sia-js')
global.Buffer = global.Buffer || require('buffer').Buffer

function toHexString(byteArray) {
	return Array.from(byteArray, function(byte) {
		return ('0' + (byte & 0xFF).toString(16)).slice(-2)
	}).join('')
}


function keypairCallback(random_data) {
	var nonce = Buffer.from([0,0,0,0,0,0,0,0])
	var arr = [random_data, nonce]
	
	var seed = Buffer.concat(arr)
	// show the words
	// var words = mnemonic.toMnemonic(data)
	
	// console.log(data) 
	let keypair = sia.keyPair.generateFromSeed(seed)

	let mnemonic = sia.mnemonics.bytesToMnemonic(random_data)

	document.getElementById('mnemonic').innerHTML = mnemonic
	document.getElementById('seckey').innerHTML = keypair['privateKey']
	document.getElementById('pubkey').innerHTML = keypair['publicKey']
	document.getElementById('address').innerHTML = keypair['address']
}

window.SkyidMain = class SkyidMain {
	constructor() {
		console.log('construct')
	}
		
	generateRandomKeypair() {
		sia.keyPair.generateRandomData(keypairCallback)
	}
}