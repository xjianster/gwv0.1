/**
 * 
 */
package com.gw.exception;

/**
 * @version 1.0
 *
 */
@SuppressWarnings("serial")
public class ParameterException  extends Exception {
	/**
	 * 
	 * 
	 */
	public ParameterException() {
		super();
	}

	/**
	 * 
	 * @param message
	 */
	public ParameterException(String message) {
		super(message);
	}

	/**
	 * 
	 * @param cause
	 */
	public ParameterException(Throwable cause) {
		super(cause);
	}

	/**
	 * 
	 * @param message
	 * @param cause
	 */
	public ParameterException(String message, Throwable cause) {
		super(message, cause);
	}

}
