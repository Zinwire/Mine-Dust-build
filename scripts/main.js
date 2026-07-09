
//КлиентЛоадИвент это при загрузке игры на главном экране
Events.On(ClientLoadEvent, () => {
//Создаю впринцепи окно(диалог)
	const window = new BaseDialog("Тест");
//Добавляю в "контейнер" окна текст
	window.cont.add("Test").row();
	window.cont.add("TEST").padTop(25);

//Добавляю кнопку закрытия окна(Да, она не появляется сама)
	window.addCloseButton();
//Показываю окно в игре
	window.show();

});