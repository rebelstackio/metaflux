window.storage = new Store(
	{
		MetaComponent: {
			status: 1,
			content: "{ initial state }"
		},
		MetaShadowComponent: {
			status: 1,
			content: "{ initial state }"
		}
	},
	{
		ALTER_METACOMPONENT_STATUS: (action, state) => {
			const { status, content } = action;
			state.MetaComponent.status = status;
			state.MetaComponent.content = content;
			return {newState: state};
		},
		ALTER_METASHADOWCOMPONENT_STATUS: (action, state) => {
			const { status, content } = action;
			state.MetaShadowComponent.status = status;
			state.MetaShadowComponent.content = content;
			return {newState: state};
		}
	}
);
