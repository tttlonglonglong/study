
export const menus = state => {
  let ms = state.admin.muser.menus || []
  let o = {}
  ms.forEach(m =>{  	
  	if( !o[m.menu_name] ){  		
  		o[m.menu_name] = {
  			...m,
  			list : []
  		}
  	}
  	o[m.menu_name]['list'].push(m)
  })
  return Object.values(o)
}