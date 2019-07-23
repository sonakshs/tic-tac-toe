(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{177:function(t,e,a){},178:function(t,e,a){},179:function(t,e,a){"use strict";a.r(e);var s=a(6),n=a.n(s),r=a(78),o=a.n(r),i=(a(177),a(82)),u=a(79),m=a(80),l=a(83),h=a(81),c=a(9),b=a(84),f=(a(178),function(t){function e(t){var a;return Object(u.a)(this,e),(a=Object(l.a)(this,Object(h.a)(e).call(this,t))).handleResetButton=a.handleResetButton.bind(Object(c.a)(a)),a.evaluate=a.evaluate.bind(Object(c.a)(a)),a.minmax=a.minmax.bind(Object(c.a)(a)),a.find_best_move=a.find_best_move.bind(Object(c.a)(a)),a.hasMovesLeft=a.hasMovesLeft.bind(Object(c.a)(a)),a.winner=a.winner.bind(Object(c.a)(a)),a.arrayToMat=a.arrayToMat.bind(Object(c.a)(a)),a.chooseRandomPlayers=a.chooseRandomPlayers.bind(Object(c.a)(a)),a.state={text:"Starting Game...",human_symbol:"O",computer_symbol:"X",o_turn:!0,board:["","","","","","","","",""]},a}return Object(b.a)(e,t),Object(m.a)(e,[{key:"handleCellClick",value:function(t,e){if(""===this.state.board[t]&&!0===e){var a=this.state.board;a[t]=this.state.human_symbol,this.setState({board:a,text:"("+this.state.computer_symbol+") Computer's turn"}),this.hasMovesLeft||this.setState({text:"Draw"});var s=this.find_best_move(a);-4!==s&&(a[s]=this.state.computer_symbol),this.setState({board:a,text:"("+this.state.human_symbol+") Your turn"}),this.hasMovesLeft||this.setState({text:"Draw"})}}},{key:"winner",value:function(t){for(var e=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],a=0;a<e.length;a++){var s=Object(i.a)(e[a],3),n=s[0],r=s[1],o=s[2];if(""!==t[n]&&t[n]===t[r]&&t[n]===t[o]&&t[r]===t[o])return t[n]}return null}},{key:"arrayToMat",value:function(t){for(var e=[],a=0,s=0;s<3;s++){e[s]=[];for(var n=0;n<3;n++)e[s][n]=t[a++]}return e}},{key:"hasMovesLeft",value:function(t){for(var e=0;e<3;e++)for(var a=0;a<3;a++)if(""===t[e][a])return!0;return this.setState({text:"Draw!!!"}),!1}},{key:"evaluate",value:function(t,e){for(var a=0;a<3;a++)if(t[a][0]===t[a][1]&&t[a][0]===t[a][2]&&t[a][1]===t[a][2]){if(t[a][0]===this.state.computer_symbol)return 100-e;if(t[a][0]===this.state.human_symbol)return e-100}for(var s=0;s<3;s++)if(t[0][s]===t[1][s]&&t[0][s]===t[2][s]&&t[1][s]===t[2][s]){if(t[0][s]===this.state.computer_symbol)return 100-e;if(t[0][s]===this.state.human_symbol)return e-100}if(t[0][0]===t[1][1]&&t[0][0]===t[2][2]&&t[1][1]===t[2][2]){if(t[0][0]===this.state.computer_symbol)return 100-e;if(t[0][0]===this.state.human_symbol)return e-100}if(t[0][2]===t[1][1]&&t[0][2]===t[2][0]&&t[1][1]===t[2][0]){if(t[0][2]===this.state.computer_symbol)return 100-e;if(t[0][2]===this.state.human_symbol)return e-100}return 0}},{key:"minmax",value:function(t,e,a){if(!1===this.hasMovesLeft(t))return this.evaluate(t,e);var s=this.evaluate(t,e);if(0!==s)return s;if(a){for(var n=-1/0,r=0;r<3;r++)for(var o=0;o<3;o++)""===t[r][o]&&(t[r][o]=this.state.computer_symbol,n=Math.max(n,this.minmax(t,e+1,!a)),t[r][o]="");return n}for(var i=1/0,u=0;u<3;u++)for(var m=0;m<3;m++)""===t[u][m]&&(t[u][m]=this.state.human_symbol,i=Math.min(i,this.minmax(t,e+1,!a)),t[u][m]="");return i}},{key:"find_best_move",value:function(t){for(var e,a=this.arrayToMat(t),s=-1,n=-1,r=-1/0,o=0;o<3;o++)for(var i=0;i<3;i++)""===a[o][i]&&(a[o][i]=this.state.computer_symbol,e=this.minmax(a,0,!1),a[o][i]="",e>r&&(r=e,s=o,n=i));return 3*s+n}},{key:"handleResetButton",value:function(){this.setState({text:"(O) Your turn",human_symbol:"O",computer_symbol:"X",o_turn:!0,board:["","","","","","","","",""]}),this.chooseRandomPlayers()}},{key:"chooseRandomPlayers",value:function(){if("computer"===(Math.random()>.5?"computer":"human")){this.setState({computer_symbol:"O",human_symbol:"X"});var t=this.state.board,e=this.find_best_move(t);-4!==e&&(t[e]="O"),this.setState({board:t,text:"(X)Your turn"})}else this.setState({computer_symbol:"X",human_symbol:"O",text:"(O)Your turn"})}},{key:"componentDidMount",value:function(){this.chooseRandomPlayers()}},{key:"render",value:function(){var t=this,e=this.state.text,a=this.winner(this.state.board),s=null===a;return null!==a&&(e=a+" won!"),this.hasMovesLeft||(e="Draw!!!"),n.a.createElement("div",{className:"master"},n.a.createElement("div",{className:"game"},n.a.createElement("div",{className:"board"},this.state.board.map(function(e,a){return n.a.createElement("div",{className:"square",key:a,onClick:function(){return t.handleCellClick(a,s)}}," ",e," ")}))),n.a.createElement("div",{className:"message-text"},e),n.a.createElement("div",{className:"side-bar"},n.a.createElement("div",{className:"button-line"},n.a.createElement("div",{className:"active-button",onClick:function(){return t.handleResetButton()}}," Reset "))))}}]),e}(s.Component));o.a.render(n.a.createElement(f,null),document.getElementById("root"))},85:function(t,e,a){t.exports=a(179)}},[[85,1,2]]]);
//# sourceMappingURL=main.e1741435.chunk.js.map