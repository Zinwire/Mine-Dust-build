Events.on(ClientLoadEvent, () => {

    // 1. Создаем диалог с пробелом, чтобы включилась стандартная полупрозрачная рамка окна
    const welcomeDialog = new BaseDialog(" ");

    // 2. Стираем пробел из верхней панели, чтобы заголовок не дублировался
    welcomeDialog.titleTable.clearChildren();

    // 3. Собираем контент внутри главного контейнера cont
    // Добавляем заголовок
    welcomeDialog.cont.add("[cyan]Приветствуем вас в моде![]").padTop(10).row();

    // Добавляем жёлтую разделительную полосу
    welcomeDialog.cont.image().color(Pal.accent).height(4).width(450).padTop(10).padBottom(15).row();

    // Добавляем ваш текст сообщения
    let cell = welcomeDialog.cont.add(
        "[orange]Я, один из разработчиков мода Mine Dust приветствую вас в моде![]\n\n" +
        "Мод пока-что находится в бете, поэтому могут встречаться блоки/предметы без текстур, и баги :)\n\n" +
        "Если вам нравится задумка, а может и реализация мода, вы можете поддержать его разработку, " +
        "поставив звезду моду на [gray]Github[], либо подписавшись на [#24A1DE]телеграм канал[] разработчиков.\n\n" +
        "[accent]Это сообщение можно выключить в настройках игры[]"
    );
    
    // Ограничиваем ширину текста и включаем перенос строк
    cell.width(600); 
    cell.wrap();     
    cell.center();   
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

    // 5. Показываем окно — этот метод сам выставит его идеально по центру экрана 
    // с нужной прозрачностью фона, как у оригинального showText
    welcomeDialog.show();
});
