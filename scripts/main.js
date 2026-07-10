Events.on(ClientLoadEvent, () => {

    // 1. Создаем базовый диалог (класс Dialog автоматически центруется игрой)
    const welcomeDialog = new Dialog("");

    // 2. ЖЕСТКО ЗАДАЕМ РАЗМЕР ОКНА (Ширина, Высота в пикселях)
    // Это не даст элементам разъехаться или улететь в верхний угол
    welcomeDialog.setSize(680, 480);

    // 3. Создаем внутреннюю красивую рамку, подгоняя под размер окна
    let mainTable = welcomeDialog.cont.table(Styles.black6).pad(10).get();

    // 4. Собираем контент внутри нашей рамки по вертикали (.row())
    
    // Заголовок мода
    mainTable.add("[cyan]Приветствуем вас в моде![]").padTop(10).row();

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
    
    textCell.width(600); // Ограничиваем текст по ширине рамки
    textCell.wrap();     // Включаем автоперенос длинных строк
    textCell.center();   // Выравниваем текст по центру плашки
    textCell.row();

    // 5. Пересобираем область нижних кнопок
    welcomeDialog.buttons.clearChildren();
    welcomeDialog.buttons.defaults().size(200, 50).pad(10); // Чуть уменьшили размер для баланса

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

    // 6. Показываем готовое окно. Метод show() у класса Dialog выставит его 
    // строго по геометрическому центру вашего экрана.
    welcomeDialog.show();
});
