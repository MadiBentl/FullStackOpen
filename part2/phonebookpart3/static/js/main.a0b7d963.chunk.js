(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,t,n){e.exports=n(37)},36:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var a=n(3),r=n(0),s=n.n(r),u=n(13),o=n.n(u),c=n(2),m=n.n(c),l="http://localhost:3001/api/persons",i=function(){return m.a.get(l).then((function(e){return e.data}))},f=function(e){return m.a.post(l,e).then((function(e){return e.data}))},d=function(e,t){return m.a.put(l.concat("/",e),t).then((function(e){return e.data}))},p=function(e){return m.a.delete(l.concat("/",e)).then((function(e){return e.data}))},h=(n(36),function(e){var t=e.message;return""===t.person?null:"successfully added"==t.msg?s.a.createElement("div",{className:"success"},"".concat(t.msg," ").concat(t.person)):"doesnt exist"==t.msg?s.a.createElement("div",{className:"error"}," ".concat(t.person," ").concat(t.msg)):void 0}),g=function(e){var t=e.persons,n=e.person,a=e.setPersons,r=e.setMessage;return s.a.createElement("button",{name:n.id,onClick:function(e){window.confirm("delete????")&&p(e.target.name).then((function(e){a(t.filter((function(e){return e.id!==n.id})))})).catch((function(e){r({person:n.name,msg:"doesnt exist"}),setTimeout((function(){return r({person:"",msg:""})}),5e3)}))}},"Delete")},v=function(e){var t=e.text;return s.a.createElement("h2",null,t)},b=function(e){var t=e.persons,n=e.setPersons,a=e.setNewName,r=e.setNewNumber,u=e.handleChange,o=e.newNumber,c=e.newName,m=e.handleNumChange,l=e.setMessage;return s.a.createElement("form",{onSubmit:function(e){var s=!1;if(e.preventDefault(),t.forEach((function(a){if(a.name===e.target.name.value&&window.confirm("Do you want to update?")){var r={name:a.name,number:e.target.num.value,id:a.id};d(a.id,r).then((function(e){return n(t.map((function(t){return t.id!==a.id?t:e})))})).catch((function(e){return console.log("person doesnf exist")})),s=!0}})),!s){var u={name:e.target.name.value,number:e.target.num.value};f(u).then((function(e){return n(t.concat(e))})).then(a("")).then(r("")).then((function(e){l({person:u.name,msg:"successfully added"}),setTimeout((function(){return l({person:"",msg:""})}),5e3)})),s=!1}}},s.a.createElement("div",null,"name: ",s.a.createElement("input",{name:"name",value:c,onChange:u})),s.a.createElement("div",null,"number: ",s.a.createElement("input",{name:"num",value:o,onChange:m})),s.a.createElement("div",null,s.a.createElement("button",{type:"submit"},"add")))},E=function(e){var t=e.notesToShow,n=e.persons,a=e.setPersons,r=e.setMessage;return s.a.createElement("ul",null,t.map((function(e){return s.a.createElement("li",{key:e.id},e.name," - ",e.number," ",s.a.createElement(g,{setMessage:r,persons:n,person:e,setPersons:a}))})))},N=function(e){var t=e.setFilterName,n=(e.persons,e.filterName);return s.a.createElement(s.a.Fragment,null,s.a.createElement("p",null,"filter shown with"),s.a.createElement("input",{name:"filterName",value:n,onChange:function(e){t(e.target.value)}}))},w=function(){var e=Object(r.useState)(""),t=Object(a.a)(e,2),n=t[0],u=t[1],o=Object(r.useState)(""),c=Object(a.a)(o,2),m=c[0],l=c[1],f=Object(r.useState)(""),d=Object(a.a)(f,2),p=d[0],g=d[1],w=Object(r.useState)([]),j=Object(a.a)(w,2),O=j[0],x=j[1],C=Object(r.useState)({person:"",msg:""}),S=Object(a.a)(C,2),k=S[0],P=S[1];Object(r.useEffect)((function(){i().then((function(e){x(e)}))}),[]);var y=0===p.length?O:O.filter((function(e){return e.name.includes(p)}));return s.a.createElement("div",null,s.a.createElement(v,{text:"Phonebook"}),s.a.createElement(N,{persons:O,setFilterName:g}),s.a.createElement(v,{text:"Add new"}),s.a.createElement(h,{message:k}),s.a.createElement(b,{persons:O,setFilterName:g,newName:n,setNewName:u,setNewNumber:l,newNumber:m,handleNumChange:function(e){l(e.target.value)},handleChange:function(e){u(e.target.value)},setPersons:x,setMessage:P}),s.a.createElement(v,{text:"Numbers"}),s.a.createElement(E,{notesToShow:y,setPersons:x,setMessage:P,persons:O}))};t.default=w;o.a.render(s.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.a0b7d963.chunk.js.map