class ApiFeatures {
  constructor(sorovUrl, sorovniYegish) {
    this.sorovUrl = sorovUrl;
    this.sorovniYegish = sorovniYegish;
  }
  filter() {
    // filter(advanced and basic)
    const query = { ...this.sorovUrl };
    const removeQuery = ['sort', 'page', 'limit', 'field'];
    removeQuery.forEach((val) => delete query[val]);
    const queryStr = JSON.stringify(query)
      .replace(/\bgt\b/g, '$gt')
      .replace(/\blt\b/g, '$lt')
      .replace(/\bgte\b/g, '$gte')
      .replace(/\blte\b/g, '$lte');
    ////////////////////////////////////
    this.sorovniYegish = this.sorovniYegish.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    // <----sort qilish---->\\
    if (this.sorovUrl.sort) {
      const querySort = this.sorovUrl.sort.split(',').join(' ');
      this.sorovniYegish = this.sorovniYegish.sort(querySort);
      return this;
    }
    ////////////////////////////////////
    return this;
  }
  field() {
    // <----fieldlar----> \\
    if (this.sorovUrl.field) {
      const queryField = this.sorovUrl.field.split(',').join(' ');
      this.sorovniYegish = this.sorovniYegish.select(queryField);
      return this;
    } else {
      this.sorovniYegish = this.sorovniYegish.select('-__v');
      return this;
    }
    ///////////////////////////////////////
  }
  pagination(count) {
    // <----pagination----> \\
    const page = this.sorovUrl.page * 1 || 1;
    const limit = this.sorovUrl.limit * 1 || 1;

    const skip = (page - 1) * limit;

    this.sorovniYegish = this.sorovniYegish.skip(skip).limit(limit);
    //////////////////////////////////////////
    if (this.sorovUrl.page) {
      console.log(count);
      if (count < skip) {
        throw new Error('This page is not exist');
      }
    }
    return this;
  }
}

module.exports = ApiFeatures;
