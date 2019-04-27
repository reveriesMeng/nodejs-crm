var root = document.documentElement;
function forDom(root) {
	var child = root.children;
	forChild(child);
}

function forChild(child) {
	for (var i = 0; i < child.length; i++) {
		console.log(child[i]);
		child[i].children&&forDom(child[i]);
	}
}
forDom(root);