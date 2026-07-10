Events.on(ClientLoadEvent, () => {

    // 1. Создаем ванильное, идеально отцентрированное окно с красивой полупрозрачной подложкой
    // Метод showText принимает два параметра: (Заголовок, Текст)
    // Мы передаем пустые строки, так как добавим их сами для точного контроля стилей!
    const welcomeDialog = Vars.ui.showText("", "");

    // 2. Находим внутренний контейнер контента окна (cont) и очищаем его от пустоты
    welcomeDialog.cont.clearChildren();

    // 3. Добавляем заголовок прямо по центру контейнера
    welcomeDialog.cont.add("[cyan]Приветствуем вас в моде![]").padTop(10).row();

    // 4. Добавляем жёлтую разделительную полосу
    welcomeDialog.cont.image().color(Pal.accent).height(4).width(450).padTop(10).padBottom(15).row();

    // 5. Добавляем ваш текст сообщения
    let cell = welcomeDialog.cont.add(
        "[orange]Я, один из разработчиков мода Mine Dust приветствую вас в моде![]\n\n" +
        "Мод пока-что находится в бете, поэтому могут встречаться блоки/предметы без текстур, и баги :)\n\n" +
        "Если вам нравится задумка, а может и реализация мода, вы можете поддержать его разработку, " +
        "поставив звезду моду на [gray]Github[], либо подписавшись на [#24A1DE]телеграм канал[] разработчиков.\n\n" +
        "[accent]Это сообщение можно выключить в настройках игры[]"
    );
    
    // Задаем жесткие лимиты тексту, чтобы игра ПРИНУДИТЕЛЬНО переносила строки и не растягивала окно
    cell.width(600); // Идеальная ширина для читаемости
    cell.wrap();     // Включаем автоперенос строк
    cell.center();   // Центрируем текст внутри блока
    cell.row();

    // 6. Находим контейнер кнопок (buttons) и полностью пересобираем его под 3 кнопки
    welcomeDialog.buttons.clearChildren();
    welcomeDialog.buttons.defaults().size(240, 50).pad(10); // Чуть увеличили ширину кнопок

    // Кнопка GitHub
    welcomeDialog.buttons.button(Icon.github, "GitHub мода", () => {
        Core.net.openURI("https://github.com");
    });

    // Кнопка ОК (Хорошо)
    welcomeDialog.buttons.button(Icon.ok, "Хорошо", () => {
        welcomeDialog.hide();
    });

    // Кнопка Telegram
    welcomeDialog.buttons.button(Icon.link, "Telegram мода", () => {
        Core.net.openURI("https://t.me");
    });
});
