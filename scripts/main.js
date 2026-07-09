Events.on(UnitDestroyEvent, event => {
    if (event.unit.team === Team.crux) {
        
        let message = "[scarlet]Враг уничтожен:[] " + event.unit.type.localizedName;
        
        Vars.ui.hudfrag.showToast(Icon.sword, message);
    }
});
