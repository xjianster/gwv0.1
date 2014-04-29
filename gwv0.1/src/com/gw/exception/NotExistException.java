/**
 * 
 */
package com.gw.exception;

/**
 * @version 1.0
 *
 */
@SuppressWarnings("serial")
public class NotExistException  extends Exception {
	/**
	 * 
	 * 
	 */
	public NotExistException() {
		super();
	}

	/**
	 * 
	 * @param message
	 */
	public NotExistException(String message) {
		super(message);
	}

	/**
	 * 
	 * @param cause
	 */
	public NotExistException(Throwable cause) {
		super(cause);
	}

	/**
	 * 
	 * @param message
	 * @param cause
	 */
	public NotExistException(String message, Throwable cause) {
		super(message, cause);
	}

}
