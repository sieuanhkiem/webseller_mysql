const citySelect = document.querySelector('.city');
const districtSelect = document.querySelector('.district');
const wardSelect = document.querySelector('.ward');
citySelect.onchange = function (e) {
    console.log(e.target.value);
    const value = e.target.value;
    const optionDistrict = districtSelect.querySelectorAll('option[data-district-code]') || [];
    if(optionDistrict.length > 0) {
        optionDistrict.forEach(option => { districtSelect.removeChild(option) });
    }

    const optionWads = wardSelect.querySelectorAll('option[data-ward-code]') || [];
    if(optionWads.length > 0) {
        optionWads.forEach(option => { wardSelect.removeChild(option) });
    }
    if(value != '#') {
        common.callAPIHandler(common.method.POST, `json/district/get_district_by_code`, { city_code: value }, function (result) {
            const districts = common.decrypt(result.districts);
            for (let district of districts) {
                const optionNewDistrict = document.createElement('option');
                optionNewDistrict.value = district.district_code;
                optionNewDistrict.dataset['districtCode'] = district.district_code;
                optionNewDistrict.textContent = district.district_name;
                districtSelect.appendChild(optionNewDistrict);
            }
        });
    }
};

districtSelect.onchange = function (e) {
    const value = e.target.value;
    const cityCode = citySelect.value;
    const optionWads = wardSelect.querySelectorAll('option[data-ward-code]') || [];
    if(optionWads.length > 0) {
        optionWads.forEach(option => { wardSelect.removeChild(option) });
    }
    if(value != '#') {
        common.callAPIHandler(common.method.POST, 'json/ward/get_ward_by_code', { district_code: value, city_code: cityCode }, function (result) {
            const wards = common.decrypt(result.wards);
            for (let ward of wards) {
                const option = document.createElement('option');
                option.dataset['wardCode'] = ward.ward_code;
                option.value = ward.ward_code;
                option.textContent = ward.ward_name;
                wardSelect.appendChild(option);
            }
        });
    }
}