const Node = require('./node');

class MaxHeap {
	constructor() {
	    this.root = null;
		this.parentNodes = [];
		this.currentSize = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.currentSize++;
	}

	pop() {
		if(!this.isEmpty()){
			let root = this.detachRoot();
			this.restoreRootFromLastInsertedNode(root);
			this.shiftNodeDown(this.root);
			this.currentSize--;
			return root.data;
		}
	}

	detachRoot() {
		if(this.root){
			let root = this.root;
			this.root = null;
			if(this.parentNodes[0] == root)
				this.parentNodes.shift();
			return root;
		}
	}

	restoreRootFromLastInsertedNode(detached) {
		let node = this.parentNodes.pop();
		this.root = node;
		if(node && node.parent){
			let nodeParent = node.parent;
			node.remove();
			if(detached.left)
				node.appendChild(detached.left);
			if(detached.right)
				node.appendChild(detached.right);
			if(nodeParent != detached && nodeParent.left)
				this.parentNodes.unshift(nodeParent);
			this.parentNodes.unshift(node);
		}
	}

	size() {
		return this.currentSize
	}

	isEmpty() {
		return !this.root
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.currentSize = 0;
	}

	insertNode(node) {
		this.root ? this.parentNodes[0].appendChild(node) : this.root = node;
		this.parentNodes.push(node);
		if(this.parentNodes[0].right)
			this.parentNodes.shift();
	}

	shiftNodeUp(node) {
		if(node.parent && node.priority > node.parent.priority){
			if(node.parent == this.root)
				this.root = node;
			this.parentNodes.forEach(function(item, i, arr){
				if(item == node.parent)
					arr[i] = node;
				else if(item == node)
					arr[i] = node.parent;
			})
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if(node && (node.left || node.right)){
			let child;
			if(!node.right || node.left.priority > node.right.priority){
				child = node.left;
				if(child.priority > node.priority){
					if(this.root == node)
						this.root = child;
					this.parentNodes.forEach(function(item, i, arr){
						if(item == node)
							arr[i] = child;
						if(item == child)
							arr[i] = node;
					})
					child.swapWithParent();
					this.shiftNodeDown(node);
				}
			}
			else if(!node.left || node.left.priority < node.right.priority){
				child = node.right;
				if(child.priority > node.priority){
					if(this.root == node)
						this.root = child;
					this.parentNodes.forEach(function(item, i, arr){
						if(item == node)
							arr[i] = child;
						if(item == child)
							arr[i] = node;
					})
					child.swapWithParent(node);
					this.shiftNodeDown(node);
				}
			}
		}
	}
}

module.exports = MaxHeap;