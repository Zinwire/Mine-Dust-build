Events.on(ClientLoadEvent, () => {

    Vars.ui.hudfrag.showToast(
        Icon.info,             // Иконка слева
        "Мод успешно запущен!" // Текст уведомления
    );
});
