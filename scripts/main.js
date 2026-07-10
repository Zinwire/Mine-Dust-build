//Events.on(ClientLoadEvent, () => {
//    // Метод принимает: (Заголовок, Основной текст)
//    Vars.ui.showText(
//        "[scarlet]ВАЖНОЕ ОБЪЯВЛЕНИЕ[]", 
//        "Ты долбаёб =)"
//    );
//});


const welcomeDialog = new BaseDialog("");

welcomeDialog.titleTable.add("[cyan]Приветствие мода![]").pad(10).row();

welcomeDialog.titleTable.image().color(Pal.accent).height(3).fillX().padTop(5);