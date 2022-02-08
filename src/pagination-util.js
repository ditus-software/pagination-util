//
// Copyright (c) DITUS INC. All rights reserved. See LICENSE file in the project
// root for details.
//

/**
 * Contains static methods for working with paginating result sets.
 */
export default class PaginationUtil {
  /**
   * Generates an array containing page numbers. These numbers are generally
   * displayed below a table or grid and can be clicked on in order to view a
   * particular page of results.
   *
   * @param {number} currentPage The current page number from 1 to N.
   * @param {number} pageCount The total number of pages from 1 to N.
   * @param {number} maxPagesToDisplay The maximum number of pages to display.
   * @returns {Array} An array of page numbers.
   */
  static getPageNumbers(currentPage, pageCount, maxPagesToDisplay) {
    const result = [];

    for (let i = currentPage; i < currentPage + maxPagesToDisplay && i <= pageCount; i += 1) {
      result.push(i);
    }

    return result;
  }

  /**
   * Gets the number of pages.
   *
   * @param {number} total The total results.
   * @param {number} maxPerPage The maximum results per page.
   * @example
   * // Returns 2 pages.
   * getPageCount(16, 15);
   * @returns {number} The total number of pages.
   */
  static getPageCount(total, maxPerPage) {
    return Math.max(1, Math.ceil(total / maxPerPage));
  }

  /**
   * Calculates the index of the first record to display on the page.
   *
   * @param {number} currentPage The current page number from 1 to N.
   * @param {number} resultsPerPage The number of results displayed on a single
   * page.
   * @returns {number} The index of the first record to display from 0 to N.
   */
  static getSkip(currentPage, resultsPerPage) {
    return (currentPage - 1) * resultsPerPage;
  }

  /**
   * Goes to the next page of the results.
   *
   * @param {number} currentPage The current page number from 1 to N.
   * @param {number} pageCount The total number of pages.
   * @param {Function} callback A call back function that accepts the page
   * number and displays the results.
   * @returns {number} The new page number.
   */
  static gotoNextPage(currentPage, pageCount, callback) {
    if (currentPage < pageCount) {
      callback(currentPage + 1);
      return currentPage + 1;
    }

    return currentPage;
  }

  /**
   * Goes to the specified page number.
   *
   * @param {number} currentPage The current page number from 1 to N.
   * @param {number} pageNumber The page number to go to from 1 to N.
   * @param {number} pageCount The total number of pages.
   * @param {Function} callback A callback function that accepts the page number
   * and displays the results.
   * @returns {number} The new page number.
   */
  static gotoPage(currentPage, pageNumber, pageCount, callback) {
    if (pageNumber >= 1 && pageNumber <= pageCount && pageNumber !== currentPage) {
      callback(pageNumber);
      return pageNumber;
    }

    return currentPage;
  }

  /**
   * Goes to the previous page of results.
   *
   * @param {number} currentPage The current page number from 1 to N.
   * @param {Function} callback A call back function that accepts the page
   * number and displays the results.
   * @returns {number} The new page number.
   */
  static gotoPreviousPage(currentPage, callback) {
    if (currentPage > 1) {
      callback(currentPage - 1);
      return currentPage - 1;
    }

    return currentPage;
  }
}
