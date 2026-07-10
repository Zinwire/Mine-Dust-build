Events.on(ClientLoadEvent, () => {
    // 1. Вызываем железно работающее ванильное окно. 
    // Заголовок и текст оставляем пустыми, мы добавим их через мгновение.
    Vars.ui.showText("", "");

    // 2. Откладываем выполнение на 1 тик, чтобы игра успела создать окно в памяти
    Time.run(1, () => {
        // Находим последнее открытое окно на экране
        let dialogs = Core.scene.getDialogs();
        if (dialogs.size > 0) {
            let currentDialog = dialogs.peek(); // Получаем это окно

            // Полностью очищаем центральную часть окна от пустоты
            currentDialog.cont.clearChildren();

            // Создаем красивую серую подложку-рамку
            let mainTable = currentDialog.cont.table(Styles.black6).pad(20).get();

            // Добавляем заголовок мода
            mainTable.add("[cyan]Приветствуем вас в моде![]").padTop(15).row();

            // Жёлтая разделительная полоса
            mainTable.image().color(Pal.accent).height(4).width(450).padTop(10).padBottom(15).row();

            // Текст сообщения
            let textCell = mainTable.add(
                "[orange]Я, один из разработчиков мода Mine Dust приветствую вас в моде![]\n\n" +
                "Мод пока-что находится в бете, поэтому могут встречаться блоки/предметы без текстур, и баги :)\n\n" +
                "Если вам нравится задумка, а может и реализация мода, вы можете поддержать его разработку, " +
                "поставив звезду моду на [gray]Github[], либо подписавшись на [#24A1DE]телеграм канал[] разработчиков.\n\n" +
                "[accent]Это сообщение можно выключить в настройках игры[]"
            );
            
            textCell.width(600);
            textCell.wrap();
            textCell.center();
            textCell.row();

            // Полностью очищаем нижнюю область кнопок и пересобираем её
            currentDialog.buttons.clearChildren();
            currentDialog.buttons.defaults().size(240, 50).pad(10);

            // Кнопка GitHub мода
            currentDialog.buttons.button(Icon.github, "GitHub мода", () => {
                Core.net.openURI("https://github.com");
            });

            // Кнопка закрытия окна
            currentDialog.buttons.button(Icon.ok, "Хорошо", () => {
                currentDialog.hide();
            });

            // Кнопка перехода в телеграм канал мода
            currentDialog.buttons.button(Icon.link, "Telegram мода", () => {
                Core.net.openURI("https://t.me");
            });
        }
    });
});
