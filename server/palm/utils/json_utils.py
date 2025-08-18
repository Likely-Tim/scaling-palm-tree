def filter_items(items, filter_key, filter_value):
    return [item for item in items if item[filter_key] == filter_value]
