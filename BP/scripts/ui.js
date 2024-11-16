import { world } from "@minecraft/server"
import { ActionFormData } from "@minecraft/server-ui"

world.afterEvents.itemUse.subscribe((eventData) => {

    const ui = new ActionFormData()
        .title("")
        .body("")
        .button("button1")
        .button("button2")
        .button("button3");

    const customUi = new ActionFormData()
        .title("")
        .body("")
        .button("button1")
        .button("button2")
        .button("button3");

    const { sourse, itemStack } = eventData
    switch (itemStack.typeId) {
        case "minecraft:compass": ui.show(source); break;
        case "minecraft:clock": customUi.show(source); break;
    }
})