//
// Copyright (c) DITUS INC. All rights reserved. See LICENSE file in the project
// root for details.
//
import PaginationUtil from './pagination-util';

describe('PaginationUtil', () => {
  describe('getPageNumbers', () => {
    it('returns an empty array if the current page is greater than the page count.', () => {
      expect(PaginationUtil.getPageNumbers(10, 9, 100)).toEqual([]);
    });

    it('returns a array with one element if the current page matches the page count.', () => {
      expect(PaginationUtil.getPageNumbers(9, 9, 100)).toEqual([9]);
    });

    it('returns a array of all page numbers from the current page to the total pages if the total pages is less than the maximum pages to display.', () => {
      expect(PaginationUtil.getPageNumbers(1, 9, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('returns a array of page numbers from the current page limited by the maximum pages, when there are still more pages to display.', () => {
      expect(PaginationUtil.getPageNumbers(4, 9, 5)).toEqual([4, 5, 6, 7, 8]);
    });
  });

  describe('getPageCount', () => {
    it('returns 1 if the page count is less than the maximum results per page.', () => {
      expect(PaginationUtil.getPageCount(0, 15)).toBe(1);
    });

    it('returns 1 if the page count is exactly the same as the maximum results per page.', () => {
      expect(PaginationUtil.getPageCount(15, 15)).toBe(1);
    });

    it('returns 2 if the page count is one more than the maximum results per page.', () => {
      expect(PaginationUtil.getPageCount(16, 15)).toBe(2);
    });
  });

  describe('getSkip', () => {
    it('returns 0 if the current page is the first page, regardless of how many records appear on the first page.', () => {
      expect(PaginationUtil.getSkip(1, 10)).toBe(0);
      expect(PaginationUtil.getSkip(1, 2000)).toBe(0);
    });

    it('returns the correct skip for subsequent pages.', () => {
      expect(PaginationUtil.getSkip(2, 5)).toBe(5);
      expect(PaginationUtil.getSkip(3, 5)).toBe(10);
    });
  });

  describe('gotoNextPage', () => {
    it('does not do anything when the current page is the last page.', () => {
      const callback = jest.fn();
      expect(PaginationUtil.gotoNextPage(10, 10, callback)).toBe(10);
      expect(callback).not.toHaveBeenCalled();
    });

    it('returns the next page and calls the callback with the new page number when the current page is not the last page.', () => {
      const callback = jest.fn();
      expect(PaginationUtil.gotoNextPage(5, 7, callback)).toBe(6);
      expect(callback).toHaveBeenCalledWith(6);
    });
  });

  describe('gotoPage', () => {
    it('does not do anything when the page number is greater than the page count.', () => {
      const callback = jest.fn();
      expect(PaginationUtil.gotoPage(2, 6, 5, callback)).toBe(2);
      expect(callback).not.toHaveBeenCalled();
    });

    it('does not do anything when the page number is less than 1.', () => {
      const callback = jest.fn();
      expect(PaginationUtil.gotoPage(2, 0, 5, callback)).toBe(2);
      expect(callback).not.toHaveBeenCalled();
    });

    it('does not do anything when the page number equals the current page number.', () => {
      const callback = jest.fn();
      expect(PaginationUtil.gotoPage(2, 2, 5, callback)).toBe(2);
      expect(callback).not.toHaveBeenCalled();
    });

    it('returns the page number and calls the callback with that page number when the page number is not equal to the current page and is between 1 to the page count.', () => {
      const callback = jest.fn();
      expect(PaginationUtil.gotoPage(3, 1, 5, callback)).toBe(1);
      expect(callback).toHaveBeenCalledWith(1);

      expect(PaginationUtil.gotoPage(3, 5, 5, callback)).toBe(5);
      expect(callback).toHaveBeenCalledWith(5);

      expect(PaginationUtil.gotoPage(3, 4, 5, callback)).toBe(4);
      expect(callback).toHaveBeenCalledWith(4);
    });
  });

  describe('gotoPreviousPage', () => {
    it('does not do anything when the current page is the first page (page = 1).', () => {
      const callback = jest.fn();
      expect(PaginationUtil.gotoPreviousPage(1, callback)).toBe(1);
      expect(callback).not.toHaveBeenCalled();
    });

    it('returns the previous page and calls the callback with the new page number when the current page is not the first page.', () => {
      const callback = jest.fn();
      expect(PaginationUtil.gotoPreviousPage(5, callback)).toBe(4);
      expect(callback).toHaveBeenCalledWith(4);
    });
  });
});
