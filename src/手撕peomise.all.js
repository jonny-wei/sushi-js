/**
 * 手撕 Promise.all(iterable)
 * 
 * 并行运行异步操作
 * Promise.all(iterable) 都成功时才成功
 * 这个方法返回一个新的promise对象，该promise对象在iterable参数对象里所有的promise对象都成功的时候才会触发成功，
 * 一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。
 * 如果这个新的promise对象触发了失败状态，它会把iterable里第一个触发失败的promise对象的错误信息作为它的失败错误信息。
 */