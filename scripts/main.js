Events.on(ClientLoadEvent, () => {

    const welcomeDialog = new Dialog("");

    // 📏 Увеличиваем высоту окна (было 480, стало 580), чтобы текст не налезал на кнопки
    welcomeDialog.setSize(680, 580);

    // 🎯 ЦЕНТРИРОВАНИЕ НА УРОВНЕ СЕТКИ:
    // Создаем ячейку в контейнере cont, растягиваем её на всё окно (.fill) 
    // и принудительно выравниваем строго по центру (.center)
    let mainCell = welcomeDialog.cont.add().fill().center();
    
    // Создаем нашу красивую серую подложку-рамку внутрь этой центрированной ячейки
    let mainTable = mainCell.table(Styles.black6).pad(15).get();

    // 1. Заголовок мода
    mainTable.add("[cyan]Приветствуем вас в моде![]").padTop(10).row();

    // 2. Жёлтая разделительная полоса
    mainTable.image().color(Pal.accent).height(4).width(450).padTop(10).padBottom(15).row();

    // 3. Сам текст сообщения
    let textCell = mainTable.add(
        "[orange]Я, один из разработчиков мода Mine Dust приветствую вас в моде![]\n\n" +
        "Мод пока-что находится в бете, поэтому могут встречаться блоки/предметы без текстур, и баги :)\n\n" +
        "Если вам нравится задумка, а может и реализация мода, вы можете поддержать его разработку, " +
        "поставив звезду моду на [gray]Github[], либо подписавшись на [#24A1DE]телеграм канал[] разработчиков.\n\n" +
        "[accent]Это сообщение можно выключить в настройках игры[]"
    );
    
    textCell.width(600); // Ограничиваем текст по ширине рамки
    textCell.wrap();     // Включаем автоперенос длинных строк
    textCell.center();   // Выравниваем текст по центру плашки
    textCell.row();

    // 4. Пересобираем область нижних кнопок
    welcomeDialog.buttons.clearChildren();
    
    // Сделали кнопки чуть компактнее (200), чтобы три штуки идеально встали в ряд внутри ширины 680
    welcomeDialog.buttons.defaults().size(200, 50).pad(10); 

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

    // Показываем окно. Теперь оно железно встанет посередине.
    welcomeDialog.show();
});
