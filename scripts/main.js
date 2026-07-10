Events.on(ClientLoadEvent, () => {

    // 1. Создаем стандартный диалог. 
    // Название оставляем пустым, чтобы не было лишних ванильных рамок.
    const welcomeDialog = new BaseDialog("");

    // 2. Очищаем контент окна, если там что-то было
    welcomeDialog.cont.clearChildren();

    // 3. Создаем красивую серую подложку-рамку (Table) напрямую через конструктор
    let mainTable = new Table(Styles.black6);

    // НАПОЛНЯЕМ НАШУ РАМКУ (mainTable)
    // Заголовок мода
    mainTable.add("[cyan]Приветствуем вас в моде![]").padTop(15).row();

    // Жёлтая разделительная полоса
    mainTable.image().color(Pal.accent).height(4).width(450).padTop(10).padBottom(15).row();

    // Сам текст сообщения
    let textCell = mainTable.add(
        "[orange]Я, один из разработчиков мода Mine Dust приветствую вас в моде![]\n\n" +
        "Мод пока-что находится в бете, поэтому могут встречаться блоки/предметы без текстур, и баги :)\n\n" +
        "Если вам нравится задумка, а может и реализация мода, вы можете поддержать его разработку, " +
        "поставив звезду моду на [gray]Github[], либо подписавшись на [#24A1DE]телеграм канал[] разработчиков.\n\n" +
        "[accent]Это сообщение можно выключить в настройках игры[]"
    );
    
    textCell.width(600); // Идеальная ширина, чтобы текст красиво переносился
    textCell.wrap();     // Автоперенос строк
    textCell.center();   // Выравнивание текста по центру
    textCell.row();

    // 4. Добавляем нашу готовую рамку со всеми элементами в центр главного окна игры
    // Метод .center() здесь выровняет всю готовую таблицу строго по центру экрана!
    welcomeDialog.cont.add(mainTable).center().pad(20);

    // 5. Пересобираем область нижних кнопок
    welcomeDialog.buttons.clearChildren();
    welcomeDialog.buttons.defaults().size(210, 50).pad(10); // Оптимальный размер, чтобы три кнопки влезли в ряд

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

    // Показываем готовое центрированное окно
    welcomeDialog.show();
});
