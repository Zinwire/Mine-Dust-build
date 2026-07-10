Events.on(ClientLoadEvent, () => {

    // Создаем диалог
    const welcomeDialog = new BaseDialog("");

    // 🔥 ЖЕСТКОЕ ИСПРАВЛЕНИЕ ПОЗИЦИОНИРОВАНИЯ:
    // Заставляем окно занять весь экран как невидимый контейнер и центрируем всё содержимое
    welcomeDialog.setFillParent(true);
    welcomeDialog.center();

    // Добавляем красивое размытие/затемнение заднего плана (как у всех окон игры)
    welcomeDialog.setBackground(Styles.black9); 

    // Создаем внутреннюю рамку (плашку) для нашего контента, чтобы у окна были границы
    // Используем стандартный полупрозрачный темный стиль Mindustry
    let dialogTable = welcomeDialog.cont.table(Styles.black6).pad(20).get();

    // 1. Заголовок (добавляем внутрь нашей рамки dialogTable)
    dialogTable.add("[cyan]Приветствуем вас в моде![]").padTop(15).row();

    // 2. Жёлтая полоса под заголовком
    dialogTable.image().color(Pal.accent).height(4).width(450).padTop(10).padBottom(15).row();

    // 3. Сам текст сообщения
    let cell = dialogTable.add(
        "[orange]Я, один из разработчиков мода Mine Dust приветствую вас в моде![]\n\n" +
        "Мод пока-что находится в бете, поэтому могут встречаться блоки/предметы без текстур, и баги :)\n\n" +
        "Если вам нравится задумка, а может и реализация мода, вы можете поддержать его разработку, " +
        "поставив звезду моду на [gray]Github[], либо подписавшись на [#24A1DE]телеграм канал[] разработчиков.\n\n" +
        "[accent]Это сообщение можно выключить в настройках игры[]"
    );
    
    cell.width(650); // Ограничиваем ширину текста
    cell.wrap();     // Включаем автоматический перенос длинных строк
    cell.center();   // Выравниваем текст по центру
    cell.row();

    // --- Настройка нижних кнопок ---
    // Добавляем строку для кнопок прямо внутрь нашей рамки, снизу под текстом
    let buttonRow = dialogTable.table().padTop(20).get();
    buttonRow.defaults().size(250, 50).pad(10);

    // Кнопка гитхаба мода
    buttonRow.button(Icon.github, "GitHub мода", () => {
        Core.net.openURI("https://github.com/Zinwire/Mine-Dust");
    });

    // Кнопка закрытия окна
    buttonRow.button(Icon.ok, "Хорошо", () => {
        welcomeDialog.hide();
    });

    // Кнопка перехода в телеграм канал мода
    buttonRow.button(Icon.link, "Telegram мода", () => {
        Core.net.openURI("https://t.me/MineDustMod");
    });

    // Показываем окно
    welcomeDialog.show();
});
