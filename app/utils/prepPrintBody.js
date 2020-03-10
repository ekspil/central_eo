async function prepare(input, itemInfoService, source) {

    const {items, extId, price} = input
    const date = new Date()
    const data = {
        Command: "PrintDocument",
        NumDevice: 0,
        IdCommand: extId + "-" + date.getTime(),

        // Строки чека
        CheckStrings: [
            {
                PrintText: {
                    Text: ">#2#<BURGER KING DELIVERY",
                    Font: 1,
                },
            },
            {
                PrintText: {
                    Text: ">#2#<---------------",
                    Font: 1,
                },
            },
            {
                PrintText: {
                    Text: ">#2#<  ",
                    Font: 1,
                },
            },
            {
                PrintText: {
                    Text: ">#2#<  ",
                    Font: 1,
                },
            },
            {
                PrintText: {
                    Text: "Заказ №"+ extId,
                    Font: 1, // 1-4, 0 - по настройкам ККМ
                    Intensity: 15, // 1-15, 0 - по настройкам ККМ
                },
            },
            {
                PrintText: {
                    Text: "Сумма заказа: "+ price + " руб.",
                    Font: 2, // 1-4, 0 - по настройкам ККМ
                    Intensity: 15, // 1-15, 0 - по настройкам ККМ
                },
            },
            {
                PrintText: {
                    Text: ">#2#<*************************",
                    Font: 1,
                },
            },
        ]
    }
    for(let i of items){
        if(!i.info){
            i.info = await itemInfoService.getItemInfo({uid: i.code, source})
        }

        data.CheckStrings.push({
            PrintText: {
                Text: i.count+" x "+i.name + " " + i.price + " руб.",
                Font: 2, // 1-4, 0 - по настройкам ККМ
                Intensity: 10, // 1-15, 0 - по настройкам ККМ
            },
        })
        data.CheckStrings.push({
            PrintText: {
                Text: i.info,
                Font: 3, // 1-4, 0 - по настройкам ККМ
                Intensity: 0, // 1-15, 0 - по настройкам ККМ
            },
        })
        data.CheckStrings.push({
            PrintText: {
                Text: "   ",
                Font: 3, // 1-4, 0 - по настройкам ККМ
                Intensity: 0, // 1-15, 0 - по настройкам ККМ
            },
        })
    }
    return data
}


module.exports = {
    prepare
}
