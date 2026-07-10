Events.on(ClientLoadEvent, () => {

    // Создаем диалог. Передаем пробел " ", чтобы игра включила стандартный контейнер окна
    const welcomeDialog = new BaseDialog(" ");

    // Очищаем заголовок, который создала игра по умолчанию, чтобы перенести его в cont
    welcomeDialog.titleTable.clearChildren();

    // 1. Заголовок
    welcomeDialog.cont.add("[cyan]Приветствуем вас в моде![]").padTop(10).row();

    // 2. Жёлтая полоса под заголовком
    welcomeDialog.cont.image().color(Pal.accent).height(4).width(450).padTop(10).padBottom(15).row();

    // 3. Сам текст сообщения
    // Оборачиваем текст в переменную, чтобы настроить его ширину и выравнивание
    let cell = welcomeDialog.cont.add(
        "[orange]Я, один из разработчиков мода Mine Dust приветствую вас в моде![]\n\n" +
        "Мод пока-что находится в бете, поэтому могут встречаться блоки/предметы без текстур, и баги :)\n\n" +
        "Если вам нравится задумка, а может и реализация мода, вы можете поддержать его разработку, " +
        "поставив звезду моду на [gray]Github[], либо подписавшись на [#24A1DE]телеграм канал[] разработчиков.\n\n" +
        "[accent]Это сообщение можно выключить в настройках игры[]"
    );
    
    // ЭТИ СТРОЧКИ ВСЁ ИСПРАВЛЯЮТ:
    cell.width(650); // Ограничиваем ширину текста, чтобы окно не растягивалось на весь экран
    cell.wrap();     // Включаем автоматический перенос длинных строк
    cell.center();   // Выравниваем текст по центру окна
    cell.row();

    // --- Настройка нижних кнопок ---
    welcomeDialog.buttons.clearChildren();
    
    // Делаем кнопки чуть пошире (250 вместо 210), так как названия кнопок стали длиннее
    welcomeDialog.buttons.defaults().size(250, 50).pad(10);

    // Кнопка гитхаба мода
    welcomeDialog.buttons.button(Icon.github, "GitHub мода", () => {
        Core.net.openURI("https://github.com/Zinwire/Mine-Dust");
    });

    // Кнопка закрытия окна
    welcomeDialog.buttons.button(Icon.ok, "Хорошо", () => {
        welcomeDialog.hide();
    });

    // Кнопка перехода в телеграм канал мода
    welcomeDialog.buttons.button(Icon.link, "Telegram мода", () => {
        Core.net.openURI("https://t.me/MineDustMod");
    });

    // Показываем окно
    welcomeDialog.show();
});
