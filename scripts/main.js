


Events.on(ClientLoadEvent, () => {

    // 1. Регистрируем чекбокс в настройках (Settings -> Game)
    Vars.ui.settings.game.checkPref("md-welcome-message", true);

    // 2. Проверяем настройку
    if (Core.settings.getBool("md-welcome-message")) {

        //Первый выбор: Поддержать или закрыть
        Vars.ui.showCustomConfirm(
            "[cyan]Приветствуем вас в моде![]", 
            "[orange]Я, один из разработчиков мода Mine Dust приветствую вас![]\n\n" +
            "Мод пока-что находится в бете, поэтому могут встречаться блоки/предметы без текстур, и баги :)\n" +
            "Если вам нравится задумка или реализация, вы можете поддержать проект\n" + 
            "звездой на [gray]GitHub[], либо подписавшись на наш [#24A1DE]Telegram канал[].\n\n" +
            "[accent]Это сообщение можно выключить в настройках игры.[]", 
            
            "[accent]Поддержать мод[]", "[scarlet]Хорошо[]", // Кастомные надписи для кнопок первого окна
            
            () => {
                // Действие левой кнопки ("Поддержать мод")
                // Открываем второе окно выбора платформы через тот же showCustomConfirm
                Vars.ui.showCustomConfirm(
                    "Куда перейти?",
                    "Выберите платформу для поддержки проекта:",
                    
                    "[gray]GitHub[]", "[#24A1DE]Telegram канал[]", // Кастомные надписи для кнопок второго окна
                    
                    () => {
                        // Нажал "GitHub"
                        //Core.net.openURI("https://github.com/Zinwire/Mine-Dust");
                        Packages.arc.Core.app.openURI("https://github.com/Zinwire/Mine-Dust");
                    },
                    () => {
                        // Нажал "Telegram"
                        //Core.net.openURI("https://t.me/MineDustMod");
                        Packages.arc.Core.app.openURI("https://t.me/MineDustMod");
                    }
                );
            },
            () => {
                // Действие правой кнопки ("Хорошо")
                // Пусто, окно просто закроется самой игрой
            }
        );
    }
});
