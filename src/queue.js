const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		const MAXSIZE = 30;
		this.heap = new MaxHeap();
		this.maxSize = maxSize || MAXSIZE;
	}

	push(data, priority) {
		if(this.heap.size() < this.maxSize)
			this.heap.push(data,priority);
		else throw new Error();
	}

	shift() {
		if(this.size())
			return this.heap.pop()
		else throw new Error();
	}

	size() {
		return this.heap.size()
	}

	isEmpty() {
		return this.heap.isEmpty()
	}
}

module.exports = PriorityQueue;
