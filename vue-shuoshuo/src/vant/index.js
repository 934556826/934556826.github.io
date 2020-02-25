import Vue from 'vue'
import 'vant/lib/index.css';

import { Button } from 'vant';

Vue.use(Button);

import { Search } from 'vant';

Vue.use(Search);

import { NavBar } from 'vant';

Vue.use(NavBar);

import { Icon } from 'vant';

Vue.use(Icon);

import { Image } from 'vant';

Vue.use(Image);

import { Swipe, SwipeItem } from 'vant';

Vue.use(Swipe).use(SwipeItem);

import { Card } from 'vant';

Vue.use(Card);

import { Lazyload } from 'vant';

// options 为可选参数，无则不传
Vue.use(Lazyload);

import { Tabbar, TabbarItem } from 'vant';

Vue.use(Tabbar).use(TabbarItem);

import { Row, Col } from 'vant';

Vue.use(Row).use(Col);

import { Skeleton } from 'vant';

Vue.use(Skeleton);

import { Popup } from 'vant';

Vue.use(Popup);
