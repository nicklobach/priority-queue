class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(node){
			if(!this.left){
				this.left = node;
				node.parent = this;
			}
			else if(!this.right){
				this.right = node;
				node.parent = this;
			}
		}
	}

	removeChild(node) {
		if(node == this.left){
			this.left = null;
			node.parent = null;
		}
		else if(node == this.right){
			this.right = null;
			node.parent = null
		}
		else throw new Error();
	}

	remove() {
		if(this.parent)
			this.parent.removeChild(this)
	}

	swapWithParent() {
		if(this.parent){
	        let	node = this,
				parent = this.parent,
	        	leftChild = this.left,
	        	rightChild = this.right,
	        	parentOfParent = this.parent.parent,
	    		leftChildOfParent = this.parent.left,
	    		rightChildOfParent = this.parent.right;

	    	node.remove();
	    	parent.remove();
			node.left = null;
			node.right = null;

	    	
	        if(rightChildOfParent && leftChildOfParent == node){
	        	rightChildOfParent.parent = node;
	    		node.right = rightChildOfParent;
	        }
	        else if(leftChildOfParent && rightChildOfParent == node){
	        	leftChildOfParent.parent = node;
	    		node.left = leftChildOfParent;
	        }
	        
	       
	        node.appendChild(parent);
	    	if(leftChild){
	            leftChild.parent = parent;
	            parent.left = leftChild;
	        }
	        else parent.left = null;
	        
	        if(rightChild){
	        	rightChild.parent = parent;
	            parent.right = rightChild;
	        }
	        else parent.right = null;

	        
	    	if(parentOfParent)
	            parentOfParent.appendChild(node);
		}
	}
}

module.exports = Node;
