import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// register globally
Vue.component('svg-icon', SvgIcon);

const requireAll = requireContext => requireContext.keys().map(requireContext);
// ./svg文件夹下找到svg结尾的文件被require
const req = require.context('./svg', false, /\.svg$/);

requireAll(req);
