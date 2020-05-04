window.storage = new Store(
	{
		//ini state
		headerTabActive: 0
	},
	{
		//handlres
		CHANGE_VIEW: (action, state) => {
			console.log(action)
			return { newState: state }
		}
	}
);
