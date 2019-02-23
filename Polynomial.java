
	/**
	 * Reads a polynomial from an input stream (file or keyboard). The storage format
	 * of the polynomial is:
	 * <pre>
	 *     <coeff> <degree>
	 *     <coeff> <degree>
	 *     ...
	 *     <coeff> <degree>
	 * </pre>
	 * with the guarantee that degrees will be in descending order. For example:
	 * <pre>
	 *      4 5
	 *     -2 3
	 *      2 1
	 *      3 0
	 * </pre>
	 * which represents the polynomial:
	 * <pre>
	 *      4*x^5 - 2*x^3 + 2*x + 3
	 * </pre>
	 *
	 * @param sc Scanner from which a polynomial is to be read
	 * @throws IOException If there is any input error in reading the polynomial
	 * @return The polynomial linked list (front node) constructed from coefficients and
	 *         degrees read from scanner
	 */
	public static Node read(Scanner sc)
	throws IOException {
		Node poly = null;
		while (sc.hasNextLine()) {
			Scanner scLine = new Scanner(sc.nextLine());
			poly = new Node(scLine.nextFloat(), scLine.nextInt(), poly);
			scLine.close();
		}
		return poly;
	}

	/**
	 * Returns the sum of two polynomials - DOES NOT change either of the input polynomials.
	 * The returned polynomial MUST have all new nodes. In other words, none of the nodes
	 * of the input polynomials can be in the result.
	 * 1
	 * @param poly1 First input polynomial (front of polynomial linked list)
	 * @param poly2 Second input polynomial (front of polynomial linked list
	 * @return A new polynomial which is the sum of the input polynomials - the returned node
	 *         is the front of the result polynomial
	 */
	public static Node removeZeros(Node front) {
		while(front != null && front.term.coeff == 0)
			front = front.next;

		if(front == null)
			return null;

		Node prev = front, iter = front.next;

		while(iter != null) {
			if(iter.term.coeff == 0) {
				prev.next = iter.next;
				iter = iter.next;
			} else {
				prev = prev.next;
				iter = iter.next;
			}
		}

		return front;
	}

	private static Node addNode(Node poly, Node add) { // returns step
		if(add.term.coeff == 0)
			return poly;

		for(Node iter = poly; iter != null; iter = iter.next) {
			if(iter.term.degree == add.term.degree) {
				Term newTerm = new Term(iter.term.coeff + add.term.coeff, iter.term.degree);

				iter.term = newTerm;
				return iter;
			}

			else if(iter.term.degree < add.term.degree && iter.next == null) {
				iter.next = add;
				return add;
			}

			else if(iter.term.degree < add.term.degree &&
					iter.next.term.degree > add.term.degree) {
				Node newNode = new Node(add.term.coeff, add.term.degree, iter.next);
				iter.next = newNode;

				return newNode;
			}
		}

		return add; // only case where it would get here is if poly was null to begin with
	}

	public static Node add(Node poly1, Node poly2) {
		if(poly1 == null)
			return poly2;

		if(poly2 == null)
			return poly1;

		Node step = poly2;

		while(poly1 != null) {
			step = addNode(step, poly1);

			if(step == poly1)
				return poly2;

			poly1 = poly1.next;
		}

		return removeZeros(poly2);
	}

	/**
	 * Returns the product of two polynomials - DOES NOT change either of the input polynomials.
	 * The returned polynomial MUST have all new nodes. In other words, none of the nodes
	 * of the input polynomials can be in the result.
	 *
	 * @param poly1 First input polynomial (front of polynomial linked list)
	 * @param poly2 Second input polynomial (front of polynomial linked list)
	 * @return A new polynomial which is the product of the input polynomials - the returned node
	 *         is the front of the result polynomial
	 */

	public static Node distribute(Node poly, Node dist) {
		Node ret = new Node(poly.term.coeff * dist.term.coeff, poly.term.degree + dist.term.degree, null), iter = ret;
		poly= poly.next;

		while(poly != null) {
			iter.next = new Node(poly.term.coeff * dist.term.coeff, poly.term.degree + dist.term.degree, null);

			iter = iter.next;
			poly = poly.next;
		}

		return ret;
	}

	public static Node multiply(Node poly1, Node poly2) {
		Node total = null;

		while(poly1 != null) {
			total = add(distribute(poly2, poly1), total);
			poly1 = poly1.next;
		}

		return total;
	}

	/**
	 * Evaluates a polynomial at a given value.
	 * @param poly Polynomial (front of linked list) to be evaluated
	 * @param x Value at which evaluation is to be done
	 * @return Value of polynomial p at x
	 */
	public static float evaluate(Node poly, float x) {
		float total = 0;

		while(poly != null) {
			total += Math.pow(x, poly.term.degree) * poly.term.coeff;
			poly = poly.next;
		}

		return total;
	}

	/**
	 * Returns string representation of a polynomial
	 *
	 * @param poly Polynomial (front of linked list)
	 * @return String representation, in descending order of degrees
	 */
	public static String toString(Node poly) {
		if (poly == null) {
			return "0";
		}

		String retval = poly.term.toString();
		for (Node current = poly.next ; current != null ;
		current = current.next) {
			retval = current.term.toString() + " + " + retval;
		}
		return retval;
