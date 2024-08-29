const initialState = {
    sidebarShow: true,
  }

  const reducer = (state = initialState, { type, ...rest }) => {
    switch (type) {
      case 'SITE_SIDEBAR':
        return { ...state, ...rest }
      default:
        return state
    }
  }
  
export default reducer