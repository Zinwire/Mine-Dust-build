Events.on(ClientLoadEvent, () => {

    // 1. Регистрируем чекбокс в настройках (Settings -> Game)
    Vars.ui.settings.game.checkPref("show-mine-dust-welcome", true);

    // 2. Проверяем настройку
    if (Core.settings.getBool("show-mine-dust-welcome")) {

                // Открываем окно подтверждения перехода в Telegram
                Vars.ui.showConfirm(
                    "[cyan]Приветствуем вас в моде![]", 
                    "[orange]Я, один из разработчиков мода Mine Dust приветствую вас![]\n\n" +
                    "Мод пока-что находится в бете, поэтому могут встречаться блоки/предметы без текстур, и баги :)\n" +
                    "Если вам нравится задумка или реализация, вы можете поддержать проект звездой на GitHub, или в Telegram, нажав ""Да""\n\n" +
                    "[accent]Это сообщение можно выключить в настройках игры.[]", 
                    () => {
                        // Откроется, если нажать "Да"
                        Core.net.openURI("https://t.me/MineDustMod");
                    }
                );
            
        
    }
});
