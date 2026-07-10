Events.on(ClientLoadEvent, () => {

    // 1. Создаем диалог с нормальным текстом в конструкторе.
    // Это заставит игру правильно рассчитать центр экрана и создать красивую рамку.
    const welcomeDialog = new BaseDialog("[cyan]Приветствуем вас в моде![]");

    // 2. Добавляем жёлтую разделительную полосу прямо в контейнер контента (cont)
    // Она встанет строго под заголовком
    welcomeDialog.cont.image().color(Pal.accent).height(4).width(450).padTop(5).padBottom(15).row();

    // 3. Добавляем ваш текст сообщения
    let cell = welcomeDialog.cont.add(
        "[orange]Я, один из разработчиков мода Mine Dust приветствую вас в моде![]\n\n" +
        "Мод пока-что находится в бете, поэтому могут встречаться блоки/предметы без текстур, и баги :)\n\n" +
        "Если вам нравится задумка, а может и реализация мода, вы можете поддержать его разработку, " +
        "поставив звезду моду на [gray]Github[], либо подписавшись на [#24A1DE]телеграм канал[] разработчиков.\n\n" +
        "[accent]Это сообщение можно выключить в настройках игры[]"
    );
    
    // Задаем жесткие параметры текста
    cell.width(600); // Ограничиваем ширину, чтобы окно не расползалось
    cell.wrap();     // Включаем автоперенос строк
    cell.center();   // Выравниваем по центру
    cell.row();

    // 4. Пересобираем нижние кнопки
    welcomeDialog.buttons.clearChildren();
    welcomeDialog.buttons.defaults().size(240, 50).pad(10);

    // Кнопка GitHub
    welcomeDialog.buttons.button(Icon.github, "GitHub мода", () => {
        Core.net.openURI("https://github.com");
    });

    // Кнопка ОК
    welcomeDialog.buttons.button(Icon.ok, "Хорошо", () => {
        welcomeDialog.hide();
    });

    // Кнопка Telegram
    welcomeDialog.buttons.button(Icon.link, "Telegram мода", () => {
        Core.net.openURI("https://t.me");
    });

    // 5. Показываем готовое центрированное окно
    welcomeDialog.show();
});
