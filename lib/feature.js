function APIfeature(query, queryString) {
    this.query = query
    this.queryString = queryString

    this.searching = () => {
        const search = this.queryString.search
        if (search) {
            this.query = this.query.find({
                $text: { $search: search }
            })
        } else {
            this.query = this.query.find()
        }
        return this;
    }

    this.filtering = () => {
        const queryObj = { ...this.queryString } //queryString = req.query

        const excludedFields = ['page', 'sort', 'limit', 'search']
        excludedFields.forEach(el => delete (queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr))

        return this;
    }

    this.sorting = () => {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    this.paginating = () => {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 8
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

module.exports = APIfeature