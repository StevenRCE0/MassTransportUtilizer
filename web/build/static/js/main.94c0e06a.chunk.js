(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[0],{111:function(e,t,a){},204:function(e,t,a){},380:function(e,t,a){},425:function(e,t,a){},426:function(e,t,a){},429:function(e,t,a){"use strict";a.r(t);var i=a(2),n=a(1),s=a.n(n),c=a(70),r=a.n(c),l=a(51),d=a(14),j=a(17),o=a(18),u=a(20),h=a(19),b=(a(111),a(204),a(7)),v=(a(380),function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var i;return Object(j.a)(this,a),(i=t.call(this,e)).state={allOptions:i.props.switchOptions},i}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.setState({activated:this.state.allOptions[0]})}},{key:"enumOptions",value:function(e,t){var a=[];return this.state.allOptions.forEach((function(n){var s="SwitchTick";e.activated===n&&(s+=" activated"),a.push(Object(i.jsx)("button",{id:n,onClick:function(){return t({activated:n})},className:s,children:n}))})),a}},{key:"render",value:function(){return Object(i.jsx)("div",{className:"SwitchBase",children:this.enumOptions(this.props.state,this.props.setState)})}}]),a}(s.a.Component)),O=a(25),p=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var i;return Object(j.a)(this,a),(i=t.call(this,e)).state={id:i.props.id,x:i.props.x,y:i.props.y,level:i.props.level,type:i.props.type,line:i.props.line,station:i.props.station},i}return Object(o.a)(a,[{key:"render",value:function(){var e=this,t=2*this.state.level*2;return Object(i.jsxs)(O.Group,{x:this.state.x,y:this.state.y,children:[Object(i.jsx)(O.Circle,{radius:.5*t,fill:"#FFF",onClick:function(){return e.props.setPanel(0,"station",[e.state.x,e.state.y],1)}}),Object(i.jsx)(O.Ring,{innerRadius:.5*t,outerRadius:t,fill:"#990"}),Object(i.jsx)(O.Text,{text:this.state.station,fontSize:20,x:1.5*t+5})]})}}]),a}(s.a.Component),x=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var i;return Object(j.a)(this,a),(i=t.call(this,e)).state={id:i.props.id,x1:i.props.x1,y1:i.props.y1,x2:i.props.x2,y2:i.props.y2,level:i.props.level,line:i.props.line},i}return Object(o.a)(a,[{key:"render",value:function(){var e=5+.1*this.state.level;return Object(i.jsx)(O.Line,{x:0,y:0,points:[this.state.x1,this.state.y1,this.state.x2,this.state.y2],stroke:"#BBB",strokeWidth:e})}}]),a}(s.a.Component),m=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var i;return Object(j.a)(this,a),(i=t.call(this,e)).state={x:i.props.x,y:i.props.y},i.props.type,i}return Object(o.a)(a,[{key:"render",value:function(){return Object(i.jsx)(O.Group,{children:Object(i.jsx)(O.Rect,{width:50,height:80,fill:"#EEE"})})}}]),a}(s.a.Component),f=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var i;return Object(j.a)(this,a),(i=t.call(this,e)).state={panel:{pos:[],id:0}},i}return Object(o.a)(a,[{key:"setPanel",value:function(e,t,a,i){this.setState({panel:{pos:a,id:e}}),alert("nyan")}},{key:"showPanel",value:function(){return void 0===this.state.pos?Object(i.jsx)(s.a.Fragment,{}):Object(i.jsx)(m,{x:this.state.pos[0],y:this.state.pos[1]})}},{key:"render",value:function(){var e=this,t=[],a=[];return t.push(Object(i.jsx)(p,{x:50,y:500,level:5,station:"sta999",setPanel:function(t,a,i,n){e.setPanel(t,a,i,n)}})),t.push(Object(i.jsx)(p,{x:100,y:50,level:2,station:"sta666",setPanel:function(t,a,i,n){e.setPanel(t,a,i,n)}})),a.push(Object(i.jsx)(x,{x1:50,y1:500,x2:100,y2:50,level:20})),Object(i.jsxs)(O.Stage,{height:window.innerHeight,width:window.innerWidth,children:[Object(i.jsx)(O.Layer,{id:"FMpaths",children:a}),Object(i.jsx)(O.Layer,{id:"FMstations",children:t}),Object(i.jsx)(O.Layer,{id:"FMpanels",children:this.showPanel()})]})}}]),a}(s.a.Component),y={position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)"};function g(e,t,a){var n=e.lines,s=[],c=[];return n.map((function(e,a){return e.values.map((function(t,a){var i={};return i.index=a,i[e.name]=t,s[a]=Object.assign(i,s[a]),i})),c.push(Object(i.jsx)(b.f,{type:"monotone",dot:{r:6},id:a,dataKey:e.name,stroke:t[a],strokeWidth:4})),s})),Object(i.jsxs)(b.g,{data:s,width:a.width,height:a.height,style:y,children:[Object(i.jsx)(b.e,{}),c]})}function k(e,t,a){var n=[];e.map((function(e){return n.push(Object.keys(e)),e})),n=n[0],console.log(n);var s=n.map((function(e,a){return Object(i.jsx)(b.a,{dataKey:e,fill:t[a]})}));return Object(i.jsxs)(b.b,{data:e,width:a.width,height:a.height,style:y,children:[s,Object(i.jsx)(b.e,{})]})}var w=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var i;return Object(j.a)(this,a),(i=t.call(this,e)).state={rounded:20},i}return Object(o.a)(a,[{key:"render",value:function(){var e=2*this.props.size,t=e/8,a=[{name:"\u6478",value:40},{name:"\u5230",value:90},{name:"\u98de",value:60},{name:"\u8d77",value:70}],n=["#137A7F","#373B3E","#E12885","#66CCFF"],s={height:"100%",width:"100%",borderRadius:this.state.rounded};return Object(i.jsxs)("div",{className:"Layer",style:s,children:[Object(i.jsxs)(b.j,{style:{position:"absolute",left:t,top:t},width:e/2.5,height:e/2.5,data:a.slice(0,1),innerRadius:e/4.75,children:[Object(i.jsx)(b.h,{type:"number",domain:[0,100],angleAxisId:0,tick:!1}),Object(i.jsx)(b.i,{minAngle:0,angleAxisId:0,dataKey:"value",cornerRadius:"100%",background:!0,children:Object(i.jsx)(b.d,{fill:n[0]})}),Object(i.jsx)(b.e,{verticalAlign:"middle",align:"center",iconSize:0,wrapperStyle:{transform:"translateX(4px)"}})]}),Object(i.jsxs)(b.j,{style:{position:"absolute",right:t,top:t},width:e/2.5,height:e/2.5,data:a.slice(1,2),innerRadius:e/4.75,children:[Object(i.jsx)(b.h,{type:"number",domain:[0,100],angleAxisId:0,tick:!1}),Object(i.jsx)(b.i,{minAngle:0,angleAxisId:0,dataKey:"value",cornerRadius:"100%",background:!0,children:Object(i.jsx)(b.d,{fill:n[1]})}),Object(i.jsx)(b.e,{verticalAlign:"middle",align:"center",iconSize:0,wrapperStyle:{transform:"translateX(4px)"}})]}),Object(i.jsxs)(b.j,{style:{position:"absolute",left:t,bottom:t},width:e/2.5,height:e/2.5,data:a.slice(2,3),innerRadius:e/4.75,children:[Object(i.jsx)(b.h,{type:"number",domain:[0,100],angleAxisId:0,tick:!1}),Object(i.jsx)(b.i,{minAngle:0,angleAxisId:0,dataKey:"value",cornerRadius:"100%",background:!0,children:Object(i.jsx)(b.d,{fill:n[2]})}),Object(i.jsx)(b.e,{verticalAlign:"middle",align:"center",iconSize:0,wrapperStyle:{transform:"translateX(4px)"}})]}),Object(i.jsxs)(b.j,{style:{position:"absolute",right:t,bottom:t},width:e/2.5,height:e/2.5,data:a.slice(3,4),innerRadius:e/4.75,children:[Object(i.jsx)(b.h,{type:"number",domain:[0,100],angleAxisId:0,tick:!1}),Object(i.jsx)(b.i,{minAngle:0,angleAxisId:0,dataKey:"value",cornerRadius:"100%",background:!0,children:Object(i.jsx)(b.d,{fill:n[3]})}),Object(i.jsx)(b.e,{verticalAlign:"middle",align:"center",iconSize:0,wrapperStyle:{transform:"translateX(4px)"}})]})]})}}]),a}(s.a.Component),N=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var i;return Object(j.a)(this,a),(i=t.call(this,e)).state={rounded:20},i}return Object(o.a)(a,[{key:"greatLegend",value:function(e){return Object(i.jsx)("span",{children:e})}},{key:"render",value:function(){var e={height:"100%",width:"100%",borderRadius:this.state.rounded,align:"center"},t=this.props.size;return Object(i.jsx)("div",{className:"Layer",style:e,children:Object(i.jsxs)(b.j,{data:[{name:"\u9e3d\u5b50\u529b",value:80}],width:t,height:t,innerRadius:t/2,style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},children:[Object(i.jsx)(b.h,{type:"number",domain:[0,100],angleAxisId:0,tick:!1}),Object(i.jsx)(b.i,{angleAxisId:0,dataKey:"value",cornerRadius:"100%",background:!0,children:Object(i.jsx)(b.d,{fill:"#137A7F"})}),Object(i.jsx)(b.e,{verticalAlign:"middle",align:"center",iconSize:0,wrapperStyle:{transform:"translateX(4px)"},formatter:this.greatLegend})]})})}}]),a}(s.a.Component),A=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var i;return Object(j.a)(this,a),(i=t.call(this,e)).state={rounded:20},i}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props.port,t={borderRadius:this.state.rounded},a=["#A00","#00A"];return Object(i.jsx)("div",{className:"Layer",style:t,children:Object(i.jsxs)(b.g,{data:[{name:"Page A",key:4e3,pv:2400,amt:2400},{name:"Page B",uv:3e3,pv:1398,amt:2210},{name:"Page C",uv:2e3,pv:9800,amt:2290},{name:"Page D",uv:2780,pv:3908,amt:2e3},{name:"Page E",uv:1890,pv:4800,amt:2181},{name:"Page F",uv:2390,pv:3800,amt:2500},{name:"Page G",uv:3490,pv:4300,amt:2100}],width:e.width,height:e.height,style:y,children:[Object(i.jsx)(b.c,{}),Object(i.jsx)(b.k,{}),Object(i.jsx)(b.l,{}),Object(i.jsx)(b.e,{}),Object(i.jsx)(b.f,{dataKey:"uv",stroke:a[0],strokeWidth:4,dot:{r:6}}),Object(i.jsx)(b.f,{dataKey:"pv",stroke:a[1],strokeWidth:4,dot:{r:6}})]})})}}]),a}(s.a.Component),S=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var i;return Object(j.a)(this,a),(i=t.call(this,e)).state={rounded:20},i}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props.port,t={height:"100%",width:"100%",borderRadius:this.state.rounded};return Object(i.jsx)("div",{className:"Layer",style:t,children:g({xAxisMeasurement:"XExample",lines:[{name:"One",values:[4e3,5e3,3500,5e3]},{name:"Two",values:[7500,5560,2280,5600]}]},["#EA0","#08A"],e)})}}]),a}(s.a.Component),C=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var i;return Object(j.a)(this,a),(i=t.call(this,e)).state={rounded:20},i}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props.port,t={width:"100%",height:"100%","border-radius":this.state.rounded};return Object(i.jsx)("div",{className:"Layer",style:t,children:k([{uv:900,pv:609}],["#998","#753"],e)})}}]),a}(s.a.Component),z=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var i;return Object(j.a)(this,a),(i=t.call(this,e)).state={rounded:20,activated:"\u65e0"},i}return Object(o.a)(a,[{key:"render",value:function(){var e=this;return Object(i.jsxs)("div",{className:"Layer",style:{borderRadius:this.state.rounded},children:[Object(i.jsx)(v,{switchOptions:["\u65e0","\u70ed\u529b\u56fe"],state:this.state,setState:function(t){return e.setState(t)}}),Object(i.jsx)(f,{})]})}}]),a}(s.a.Component),P=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var i;return Object(j.a)(this,a),(i=t.call(this,e)).calculateSize=function(){i.setState({size:Math.min(window.innerHeight/6,window.innerWidth/8)})},i.state={},i}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.calculateSize(),window.addEventListener("resize",this.calculateSize)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.calculateSize)}},{key:"render",value:function(){var e=this.state.size;return Object(i.jsx)(s.a.Fragment,{children:Object(i.jsxs)("div",{className:"OverviewGrid",children:[Object(i.jsx)("div",{className:"div1",children:Object(i.jsx)(z,{})}),Object(i.jsx)("div",{className:"div2",children:Object(i.jsx)(N,{size:e})}),Object(i.jsx)("div",{className:"div3",children:Object(i.jsx)(N,{size:e})}),Object(i.jsx)("div",{className:"div4",children:Object(i.jsx)(N,{size:e})}),Object(i.jsx)("div",{className:"div5",children:Object(i.jsx)(N,{size:e})}),Object(i.jsx)("div",{className:"div6",children:Object(i.jsx)(w,{size:e})}),Object(i.jsx)("div",{className:"div7",children:Object(i.jsx)(w,{size:e})}),Object(i.jsx)("div",{className:"div8",children:Object(i.jsx)(A,{port:{height:e,width:2*e}})}),Object(i.jsx)("div",{className:"div9",children:Object(i.jsx)(S,{port:{height:e,width:3*e}})}),Object(i.jsx)("div",{className:"div10",children:Object(i.jsx)(C,{port:{height:e,width:2*e}})})]})})}}]),a}(s.a.Component),R=(a(425),function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){return Object(j.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return Object(i.jsx)(s.a.Fragment,{children:Object(i.jsxs)("div",{className:"PAGrid",children:[Object(i.jsx)("div",{className:"div1"}),Object(i.jsx)("div",{className:"div2"}),Object(i.jsx)("div",{className:"div3"}),Object(i.jsx)("div",{className:"div4"}),Object(i.jsx)("div",{className:"div5"}),Object(i.jsx)("div",{className:"div6"}),Object(i.jsx)("div",{className:"div7"}),Object(i.jsx)("div",{className:"div8"}),Object(i.jsx)("div",{className:"div9"}),Object(i.jsx)("div",{className:"div10"}),Object(i.jsx)("div",{className:"div11"}),Object(i.jsx)("div",{className:"div12"}),Object(i.jsx)("div",{className:"div13"})]})})}}]),a}(s.a.Component));a(426);var F=function(){return Object(i.jsxs)(l.a,{children:[Object(i.jsx)(d.a,{path:"/",exact:!0,children:Object(i.jsx)(P,{})}),Object(i.jsx)(d.a,{path:"/PassengerAnalytics",children:Object(i.jsx)(R,{})}),Object(i.jsxs)("div",{className:"Dock",children:[Object(i.jsx)(l.b,{to:"/",activeClassName:"active",exact:!0,children:Object(i.jsx)("button",{className:"DockNavigation",children:"\u6982\u89c8"})}),Object(i.jsx)(l.b,{to:"PassengerAnalytics",activeClassName:"active",children:Object(i.jsx)("button",{className:"DockNavigation",children:"\u5ba2\u6d41\u60c5\u51b5\u5206\u6790"})})]})]})},L=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,431)).then((function(t){var a=t.getCLS,i=t.getFID,n=t.getFCP,s=t.getLCP,c=t.getTTFB;a(e),i(e),n(e),s(e),c(e)}))};r.a.render(Object(i.jsx)(s.a.StrictMode,{children:Object(i.jsx)(F,{})}),document.getElementById("root")),L()}},[[429,1,2]]]);
//# sourceMappingURL=main.94c0e06a.chunk.js.map