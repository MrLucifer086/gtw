const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")

const { getBuffer } = require('../lib/myfunc')
const { color, bgcolor } = require('../lib/color')

let setting = JSON.parse(fs.readFileSync('./message/setting.json'))

module.exports = welcome = async (Marcel, anu) => {
	    const welkom = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
	    const isWelcome = welkom.includes(anu.jid)	    
	    if (!isWelcome) return
		try {
			const mdata = await Marcel.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await Marcel.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				} 
				let buff = await getBuffer(ppimg)
				buttons = [
                { buttonId: `98`, buttonText: { displayText: "Welcome Member Baru" }, type: 1 },{ buttonId: `!selamatdatang`, buttonText: { displayText: "Ucapan selamat datang" }, type: 1 },{ buttonId: `!menu`, buttonText: { displayText: "Menu Bot" }, type: 1 },]
                imageMsg = (
                await Marcel.prepareMessageMedia(buff, "imageMessage", {
                thumbnail: buff,
               })
            ).imageMessage;
          buttonsMessage = {
          contentText: `βββ *γ ππΈπΏπΆπππΈ γ* βββ
				
Κα΄ΚΚα΄ >< @${num.split("@")[0]} π
sα΄Κα΄α΄α΄α΄ α΄α΄α΄α΄Ι΄Ι’ α΄Ιͺ Ι’Κα΄Κ ${mdata.subject}
Κα΄α΄α΄Κα΄α΄α΄Ι΄ Κα΄α΄α΄ α΄α΄sα΄ΚΙͺα΄sΙͺ`,
          footerText: "Creator : DENARA BOTΰΏ",
          imageMessage: imageMsg,
          buttons: buttons,
          headerType: 4,
        }
        prep = await Marcel.prepareMessageFromContent(
          mdata.id,
          { buttonsMessage },
          {}
        )
        Marcel.relayWAMessage(prep)     				             
				} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await Marcel.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				let buff = await getBuffer(ppimg)
				buttons = [
                { buttonId: `98`, buttonText: { displayText: "Κα΄ΚΙͺα΄ Κα΄Κα΄s α΄α΄Ι΄α΄sΙͺ πΏ" }, type: 1 },{ buttonId: `!bay`, buttonText: { displayText: "ucapan selamat tinggal" }, type: 1 },{ buttonId: `!menu`, buttonText: { displayText: "Menu" }, type: 1 },]
                imageMsg = (
                await Marcel.prepareMessageMedia(buff, "imageMessage", {
                thumbnail: buff,
               })
            ).imageMessage;
          buttonsMessage = {
          contentText: `α΄α΄‘α΄s α΄α΄α΄ Κα΄ α΄α΄Ι’ α΄α΄Κα΄α΄ Κα΄ΚΙͺα΄ Κα΄Ι’Ιͺπ§\n@${num.split('@')[0]}`,
          footerText: "Creator : DENARA BOTΰΏ",
          imageMessage: imageMsg,
          buttons: buttons,
          headerType: 4,
        }
        prep = await Marcel.prepareMessageFromContent(
          mdata.id,
          { buttonsMessage },
          {}
        )
        Marcel.relayWAMessage(prep)     		
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}
