(function(t){function e(e){for(var i,o,s=e[0],l=e[1],c=e[2],h=0,p=[];h<s.length;h++)o=s[h],a[o]&&p.push(a[o][0]),a[o]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);u&&u(e);while(p.length)p.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],i=!0,s=1;s<n.length;s++){var l=n[s];0!==a[l]&&(i=!1)}i&&(r.splice(e--,1),t=o(o.s=n[0]))}return t}var i={},a={app:0},r=[];function o(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=i,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var u=l;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var i=n("64a9"),a=n.n(i);a.a},"1e26":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var i=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("demo",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},r=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main"},[n("div",{attrs:{id:"paramter"}},[t._m(0),n("div"),n("input",{staticStyle:{display:"none"},attrs:{id:"input",type:"file",accept:"image/*"},on:{change:function(e){return t.change(e)}}}),n("div",{staticStyle:{display:"flex","flex-direction":"column","justify-content":"center",height:"200px",width:"250px"}},[n("div",{staticClass:"ycenter",staticStyle:{"margin-bottom":"10px"}},[n("div",{staticStyle:{width:"130px","text-align":"right","font-size":"20px",height:"30px","line-height":"30px","font-weight":"bolder","margin-right":"10px"}},[t._v("缩放/scale")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.scale,expression:"scale"}],staticStyle:{width:"70px",border:"#303133 2px solid",height:"25px",padding:"5px"},attrs:{type:"number",max:"1",min:"0",step:"0.01"},domProps:{value:t.scale},on:{input:function(e){e.target.composing||(t.scale=e.target.value)}}})]),n("div",{staticClass:"ycenter",staticStyle:{"margin-bottom":"10px"}},[n("div",{staticStyle:{width:"130px","text-align":"right","font-size":"20px",height:"30px","line-height":"30px","font-weight":"bolder","margin-right":"10px"}},[t._v("质量/quality")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.quality,expression:"quality"}],staticStyle:{width:"70px",border:"#303133 2px solid",height:"25px",padding:"5px"},attrs:{type:"number",max:"1",min:"0",step:"0.01"},domProps:{value:t.quality},on:{input:function(e){e.target.composing||(t.quality=e.target.value)}}})]),n("div",{staticClass:"ycenter"},[n("div",{staticClass:"ycenter mybutton",staticStyle:{"margin-right":"20px"},on:{click:function(e){return t.change()}}},[t._v("\n\t\t\t\t\t应用/apply\n\t\t\t\t")]),n("div",{staticClass:"ycenter mybutton",on:{click:function(e){return t.reset()}}},[t._v("\n\t\t\t\t\t重置/reset\n\t\t\t\t")])])])]),n("div",[t.mysrc?n("img",{staticClass:"img",attrs:{src:t.mysrc,width:"400px"}}):t._e()]),n("div",[n("img",{attrs:{src:t.url}})])])},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("label",{attrs:{for:"input"}},[i("div",[i("img",{attrs:{src:n("8a37")}})])])}],l=n("59ad"),c=n.n(l),u=n("2d7d"),h=n.n(u);n("34ef"),n("28a5");(function(){HTMLCanvasElement.prototype.toBlob||Object.defineProperty(HTMLCanvasElement.prototype,"toBlob",{value:function(t,e,n){for(var i=atob(this.toDataURL(e,n).split(",")[1]),a=i.length,r=new Uint8Array(a),o=0;o<a;o++)r[o]=i.charCodeAt(o);t(new Blob([r],{type:e||"image/png"}))}})})();var p=function(t){var e=new DataView(t),n=2,i=!1;if(t.length<2||65496!==e.getUint16(0))return!1;var a=e.byteLength;while(n<a-2){var r=e.getUint16(n);if(65505==r){a=e.getUint16(n+=2)-2;var o=18761==e.getUint16(n+=8);n+=10;while(n<a){var s=e.getUint16(n,o);if(274==s)return i=e.getUint16(n+8,o),i;n+=12}}n+=2}return i},d=function(t,e,n,i,a,r,o,s,l){var c=new Image;c.onload=function(){var t,u,p=document.createElement("canvas"),d=p.getContext("2d");o||s?8==r||6==r?(t=s||this.width/this.height*o,u=o||this.height/this.width*s):(t=o||this.width/this.height*s,u=s||this.height/this.width*o):(t=this.width,u=this.height),u*=e,t*=e;var f=new h.a;f.set(1,{width:t,height:u,angel:0}),f.set(3,{width:t,height:u,angel:Math.PI}),f.set(6,{width:u,height:t,angel:Math.PI/2}),f.set(8,{width:u,height:t,angel:-Math.PI/2});var g=r||1,m=f.get(g);p.width=m.width,p.height=m.height,d.translate(m.width/2,m.height/2),d.rotate(m.angel),d.drawImage(c,-t/2,-u/2,t,u),p.toBlob(function(t){a&&a(t,URL.createObjectURL(t),l)},i,n)},c.src=t},f=function(t,e,n){if(t){var i=c()(n.scale)||1,a=c()(n.quality)||.82,r=n.type||"image/jpeg",o=0!=n.exif,s=n.width||!1,l=n.height||!1,u=n.callbackParameter||null,h=new FileReader;if(o){var f=new FileReader;f.readAsArrayBuffer(t),f.onload=function(n){var o=p(n.target.result);h.readAsDataURL(t),h.onload=function(t){d(t.target.result,i,a,r,e,o,s,l,u)}}}else h.readAsDataURL(t),h.onload=function(t){d(t.target.result,i,a,r,e,!1,s,l,u)}}return!1},g=f,m={name:"demo",props:{msg:String},data:function(){return{file:"",mysrc:"",url:"",scale:1,quality:.82}},methods:{change:function(t){var e=document.querySelector("#input").files[0];this.test=g(e,this.callback,{scale:this.scale,quality:this.quality})},callback:function(t,e){console.log(t),this.mysrc=e},reset:function(){this.scale=1,this.quality=.82},disableBlob:function(){alert("The current system does not support 'canvas.toBlob',please try to set the paramter 'disableBlob'")}},mounted:function(){}},v=m,y=(n("8190"),n("2877")),b=Object(y["a"])(v,o,s,!1,null,"49b330a0",null),w=b.exports,x={name:"app",components:{demo:w}},_=x,S=(n("034f"),Object(y["a"])(_,a,r,!1,null,null,null)),j=S.exports;i["a"].config.productionTip=!1,new i["a"]({render:function(t){return t(j)}}).$mount("#app")},"64a9":function(t,e,n){},8190:function(t,e,n){"use strict";var i=n("1e26"),a=n.n(i);a.a},"8a37":function(t,e,n){t.exports=n.p+"img/plus.7bf19bbb.svg"}});
//# sourceMappingURL=app.74622d82.js.map