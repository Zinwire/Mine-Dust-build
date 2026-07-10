Events.on(ClientLoadEvent, () => {

//Создаю пустой диалог
    const welcomeDialog = new BaseDialog("");

//Заголовок
    welcomeDialog.cont.add("[cyan]Приветствуем вас в моде![]").padTop(10).row();

//Жёлтая полоса через костыль
    welcomeDialog.cont.image().color(Pal.accent).height(5).width(350).padTop(10).padBottom(15).row();

//Сам текст сообщения
    welcomeDialog.cont.add("[orange]Я, один из разработчиков мода Mine Dust приветствую вас в моде![]\nМод пока-что находится в бете, по этому могут встречаться блоки/предметы без текстур, и баги :)\nЕсли вам нравится задумка, а может и реализация мода, вы можете поддержать его разработку, \nпоставив звезду моду на [gray]Github[], либо подписавшись на [#24A1DE]телеграм канал[] разработчиков.\n\n[accent]Это сообщение можно выключить в настройках игры[]").pad(10).row();

//Для надёжности настраиваю сообщения заранее
    welcomeDialog.buttons.defaults().size(210, 50).pad(10);

//Кнопка гитхаба мода
    welcomeDialog.buttons.button(Icon.github, "Ссылка на GitHub мода", () => {
    Core.net.openURI("https://github.com/Zinwire/Mine-Dust")});

//Кнопка закрытия окна
    welcomeDialog.buttons.button(Icon.ok, "Хорошо", () => {
    welcomeDialog.hide();});

//Кнопка перехода в телеграм канал мода
    welcomeDialog.buttons.button(Icon.link, "Ссылка на Telegram мода", () => {
    Core.net.openURI("https://t.me/MineDustMod");});

//Показываю окно
    welcomeDialog.show();


});