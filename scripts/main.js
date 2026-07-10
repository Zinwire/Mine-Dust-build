Events.on(ClientLoadEvent, () => {

    // 1. Создаем диалог. Строка заголовка пустая, чтобы он не дублировался наверх.
    const welcomeDialog = new BaseDialog("");

    // 2. Создаем кастомную внутреннюю таблицу-рамку для нашего контента
    // Используем встроенный полупрозрачный темный стиль игры (Styles.black6)
    let mainTable = welcomeDialog.cont.table(Styles.black6).pad(20).get();

    // 3. Наполняем нашу рамку (mainTable) элементами строго по вертикали (.row())
    
    // Заголовок мода
    mainTable.add("[cyan]Приветствуем вас в моде![]").padTop(15).row();

    // Жёлтая разделительная полоса (задаем жесткую ширину, чтобы она не улетала)
    mainTable.image().color(Pal.accent).height(4).width(450).padTop(10).padBottom(15).row();

    // Сам текст сообщения
    let textCell = mainTable.add(
        "[orange]Я, один из разработчиков мода Mine Dust приветствую вас в моде![]\n\n" +
        "Мод пока-что находится в бете, поэтому могут встречаться блоки/предметы без текстур, и баги :)\n\n" +
        "Если вам нравится задумка, а может и реализация мода, вы можете поддержать его разработку, " +
        "поставив звезду моду на [gray]Github[], либо подписавшись на [#24A1DE]телеграм канал[] разработчиков.\n\n" +
        "[accent]Это сообщение можно выключить в настройках игры[]"
    );
    
    // Принудительно настраиваем текстовое поле, чтобы включить автоперенос
    textCell.width(600); // Окно сожмется ровно по этой ширине
    textCell.wrap();     // Текст будет аккуратно переноситься на новые строки
    textCell.center();   // Текст будет выровнен ровно по центру плашки
    textCell.row();

    // 4. Пересобираем область нижних кнопок
    welcomeDialog.buttons.clearChildren();
    welcomeDialog.buttons.defaults().size(240, 50).pad(10);

    // Кнопка GitHub мода
    welcomeDialog.buttons.button(Icon.github, "GitHub мода", () => {
        Core.net.openURI("https://github.com");
    });

    // Кнопка закрытия окна
    welcomeDialog.buttons.button(Icon.ok, "Хорошо", () => {
        welcomeDialog.hide();
    });

    // Кнопка перехода в телеграм канал мода
    welcomeDialog.buttons.button(Icon.link, "Telegram мода", () => {
        Core.net.openURI("https://t.me");
    });

    // 5. Вызываем показ. Метод show() автоматически возьмет mainTable, 
    // отцентрирует её на экране и сделает фон красиво размытым, как в showText.
    welcomeDialog.show();
});
