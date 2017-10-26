import moment from 'moment'

export default {
	date(v,formatter = 'YYYY-MM-DD'){
		return v && moment(v).format(formatter) || ''
	}
}