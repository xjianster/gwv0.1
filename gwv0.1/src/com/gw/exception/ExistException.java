/**
 * 
 */
package com.gw.exception;

/**
 * @version 1.0
 *
 */
@SuppressWarnings("serial")
public class ExistException  extends Exception {
	/**
	 * 
	 * 
	 */
	public ExistException() {
		super();
	}

	/**
	 * 
	 * @param message
	 */
	public ExistException(String message) {
		super(message);
	}

	/**
	 * 
	 * @param cause
	 */
	public ExistException(Throwable cause) {
		super(cause);
	}

	/**
	 * 
	 * @param message
	 * @param cause
	 */
	public ExistException(String message, Throwable cause) {
		super(message, cause);
	}

}
