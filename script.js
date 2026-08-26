let extractedMoney = "";

// 1. ເປີດ-ປິດ ປຸ່ມ Dropdown
function toggleDropdown(listId) {
    document.querySelectorAll('.dropdown-list').forEach(list => {
        if (list.id !== listId) list.style.display = 'none';
    });
    const list = document.getElementById(listId);
    if (list) {
        list.style.display = (list.style.display === 'none') ? 'block' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const page1 = document.getElementById('page-1');
    const step2Container = document.getElementById('step2Container');
    const registrationForm = document.getElementById('registrationForm');

    // 1. ຂໍ້ມູນແຂວງ ແລະ ເມືອງ
    const laoData = {
        "ນະຄອນຫຼວງວຽງຈັນ": ["ຈັນທະບູລີ", "ສີໂຄດຕະບອງ", "ໄຊເສດຖາ", "ສີສັດຕະນາກ", "ນາຊາຍທອງ", "ໄຊທານີ", "ຫາດຊາຍຟອງ", "ສັງທອງ", "ປາກງື່ມ"],
        "ຜົ້ງສາລີ": ["ເມືອງຜົ້ງສາລີ", "ເມືອງໄໝ່", "ເມືອງຂວາ", "ເມືອງສຳພັນ", "ເມືອງບູນເໜືອ", "ເມືອງຍອດອູ", "ເມືອງບູນໃຕ້"],
        "ຫຼວງນ້ຳທາ": ["ເມືອງນ້ຳທາ", "ເມືອງສິງ", "ເມືອງລອງ", "ເມືອງວຽງພູຄາ", "ເມືອງນາແລ"],
        "ອຸດົມໄຊ": ["ເມືອງໄຊ", "ເມືອງຫຼາ", "ເມືອງນາໝໍ້", "ເມືອງງາ", "ເມືອງແບ່ງ", "ເມືອງຮຸນ", "ເມືອງປາກແບ່ງ"],
        "ບໍ່ແກ້ວ": ["ເມືອງຫວ້ຍຊາຍ", "ເມືອງຕົ້ນເຜິ້ງ", "ເມືອງເມິງ", "ເມືອງຜາອຸດົມ", "ເມືອງປາກທາ"],
        "ຫຼວງພະບາງ": ["ເມືອງຫຼວງພະບາງ", "ເມືອງຊຽງເງິນ", "ເມືອງນານ", "ເມືອງປາກອູ", "ເມືອງນ້ຳບາກ", "ເມືອງງອຍ", "ເມືອງປາກແຊງ", "ເມືອງໂພນໄຊ", "ເມືອງຈອມເພັດ", "ເມືອງວຽງຄຳ", "ເມືອງພູຄູນ", "ເມືອງໂພນທອງ"],
        "ຫົວພັນ": ["ເມືອງຊຳເໜືອ", "ເມືອງຊຽງຄໍ້", "ເມືອງວຽງທອງ", "ເມືອງວຽງໄຊ", "ເມືອງຫົວເມືອງ", "ເມືອງຊຳໃຕ້", "ສົບເບົ້າ", "ແອດ"],
        "ໄຊຍະບູລີ": ["ເມືອງໄຊຍະບູລີ", "ເມືອງຄອບ", "ເມືອງຫົງສາ", "ເມືອງເງິນ", "ເມືອງຊຽງຮ່ອນ", "ເມືອງພຽງ", "ເມືອງປາກລາຍ", "ເມືອງແກ່ນທ້າວ", "ເມືອງບໍ່ແຕນ", "ເມືອງທົ່ງມີໄຊ"],
        "ຊຽງຂວາງ": ["ເມືອງແປກ", "ເມືອງຄຳ", "ເມືອງໜອງແຮດ", "ເມືອງຄູນ", "ເມືອງໝອກໄໝ່", "ເມືອງພູກູດ", "ເມືອງຜາໄຊ", "ທ່າໂທມ"],
        "ແຂວງວຽງຈັນ": ["ໂພນໂຮງ", "ທຸລະຄົມ", "ແກ້ວອຸດົມ", "ກາສີ", "ວັງວຽງ", "ເຟືອງ", "ຊະນາຄາມ", "ແມດ", "ຫີນເຫີບ", "ວຽງຄຳ", "ລອງຊານ", "ຮົ່ມ", "ໄຊສົມບູນ", "ໜື່ນ"],
        "ບໍລິຄຳໄຊ": ["ເມືອງປາກຊັນ", "ເມືອງທ່າພະບາດ", "ເມືອງປາກກະດິງ", "ເມືອງບໍລິຄັນ", "ເມືອງຄຳເກີດ", "ເມືອງວຽງທອງ", "ເມືອງໄຊຈຳພອນ"],
        "ຄຳມ່ວນ": ["ເມືອງທ່າແຂກ", "ເມືອງມະຫາໄຊ", "ເມືອງໜອງບົກ", "ເມືອງຫີນບູນ", "ເມືອງຍົມມະລາດ", "ເມືອງບົວລະພາ", "ເມືອງນາກາຍ", "ເມືອງເຊບັ້ງໄຟ", "ເມືອງໄຊບົວທອງ", "ເມືອງຄູນຄຳ"],
        "ສະຫວັນນະເຂດ": ["ໄກສອນພົມວິຫານ", "ອຸທຸມພອນ", "ອາດສະພັງທອງ", "ພິນ", "ເຊໂປນ", "ນອງ", "ທ່າປາງທອງ", "ສອງຄອນ", "ຈຳພອນ", "ຊົນບຸລີ", "ໄຊບຸລີ", "ວິລະບູລີ", "ອາດສະພອນ", "ໄຊພູທອງ", "ທ່າພະລານໄຊ"],
        "ສາລະວັນ": ["ສາລະວັນ", "ຕະໂອຍ", "ຕຸ້ມລານ", "ລະຄອນເພັງ", "ວາປີ", "ຄົງເຊໂດນ", "ເລົ່າງາມ", "ສະມ່ວຍ"],
        "ເຊກອງ": ["ລະມາມ", "ກະລຶມ", "ດັກຈຶງ", "ທ່າແຕງ"],
        "ຈຳປາສັກ": ["ປາກເຊ", "ຊະນະສົມບູນ", "ບາຈຽງຈະເລີນສຸກ", "ປາກຊ່ອງ", "ປະທຸມພອນ", "ໂພນທອງ", "ຈຳປາສັກ", "ສຸຂຸມມາ", "ມູນລະປະໂມກ", "ໂຂງ"],
        "ອັດຕະປື": ["ໄຊເສດຖາ", "ສາມັກຄີໄຊ", "ສະໜາມໄຊ", "ສານໄຊ", "ພູວົງ"],
        "ໄຊສົມບູນ": ["ໄຊສົມບູນ", "ທ່າໂທມ", "ຮົ່ມ", "ລ້ອງຊານ", "ພູນ"]
    };

    const provinceListEl = document.getElementById('provinceList');
    const provinceSelectedText = document.getElementById('provinceSelectedText');
    const districtListEl = document.getElementById('districtList');
    const districtSelectedText = document.getElementById('districtSelectedText');

    if (provinceListEl && provinceSelectedText) {
        provinceListEl.innerHTML = '';
        for (let province in laoData) {
            let li = document.createElement('li');
            li.textContent = province;
            li.onclick = function() {
                provinceSelectedText.textContent = province;
                provinceListEl.style.display = 'none';

                if (districtListEl && districtSelectedText) {
                    districtSelectedText.textContent = '----- ກະລຸນາເລືອກເມືອງ -----';
                    districtListEl.innerHTML = '';
                    let districts = laoData[province] || [];
                    districts.forEach(district => {
                        let liDist = document.createElement('li');
                        liDist.textContent = district;
                        liDist.onclick = function() {
                            districtSelectedText.textContent = district;
                            districtListEl.style.display = 'none';
                        };
                        districtListEl.appendChild(liDist);
                    });
                }
            };
            provinceListEl.appendChild(li);
        }
    }

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (page1) page1.style.display = 'none';
            if (step2Container) step2Container.style.display = 'block';
        });
    }

    const backToStep1Btn = document.getElementById('backToStep1');
    const backToStep1BottomBtn = document.getElementById('backToStep1Bottom');

    function goBackTo1() {
        if (step2Container) step2Container.style.display = 'none';
        if (page1) page1.style.display = 'block';
    }
    if (backToStep1Btn) backToStep1Btn.addEventListener('click', goBackTo1);
    if (backToStep1BottomBtn) backToStep1BottomBtn.addEventListener('click', goBackTo1);

    // 2. ລະບົບກັ່ນຕອງວິຊາຮຽນ
    const mainFilterBtns = document.querySelectorAll('#mainFilter .filter-btn');
    const subFilterBtns = document.querySelectorAll('#subFilter .sub-btn');
    const courseCards = document.querySelectorAll('.course-list .course-card');

    let currentMain = 'all';
    let currentSub = 'all';

    function filterCourses() {
        courseCards.forEach(card => {
            const cardCat = card.getAttribute('data-cat'); 
            const cardSub = card.getAttribute('data-sub'); 

            let match = true;
            if (currentSub !== 'all') {
                match = (cardSub === currentSub);
            } else if (currentMain !== 'all') {
                match = (cardCat === currentMain);
            }
            card.style.display = match ? 'flex' : 'none';
        });
    }

    function updateSubButtonsVisibility(mainCategory) {
        let firstVisibleSub = null;

        subFilterBtns.forEach(sb => {
            const matches = (mainCategory === 'all' || sb.getAttribute('data-cat') === mainCategory);
            sb.style.display = matches ? 'inline-block' : 'none';

            if (matches && !firstVisibleSub) {
                firstVisibleSub = sb;
            }
        });

        subFilterBtns.forEach(b => b.classList.remove('active'));
        if (firstVisibleSub) {
            firstVisibleSub.classList.add('active');
            currentSub = firstVisibleSub.getAttribute('data-sub');
        } else {
            currentSub = 'all';
        }
    }

    function updateBadgeCounts() {
        subFilterBtns.forEach(btn => {
            const subType = btn.getAttribute('data-sub');
            const selectedCount = Array.from(courseCards).filter(card => card.getAttribute('data-sub') === subType && card.classList.contains('selected')).length;
            let badge = btn.querySelector('.sub-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'sub-badge';
                badge.style.marginLeft = '6px'; badge.style.padding = '2px 6px'; badge.style.borderRadius = '50%';
                badge.style.fontSize = '11px'; badge.style.fontWeight = 'bold';
                btn.appendChild(badge);
            }
            badge.textContent = selectedCount;
            badge.style.display = (selectedCount > 0) ? 'inline-block' : 'none';
            badge.style.background = btn.classList.contains('active') ? 'rgba(255, 255, 255, 0.3)' : '#3b82f6';
            badge.style.color = '#ffffff';
        });
    }

    mainFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            mainFilterBtns.forEach(b => { 
                b.classList.remove('active'); 
                const icon = b.querySelector('.fa-check'); 
                if(icon) icon.style.display = 'none'; 
            });
            btn.classList.add('active');
            const icon = btn.querySelector('.fa-check'); 
            if(icon) icon.style.display = 'inline-block';

            currentMain = btn.getAttribute('data-filter');

            updateSubButtonsVisibility(currentMain);
            filterCourses();
            updateBadgeCounts();
        });
    });

    subFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            subFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSub = btn.getAttribute('data-sub');
            filterCourses();
            updateBadgeCounts();
        });
    });

    // 3. ລະບົບເລືອກວິຊາ (ໃຫ້ເລືອກໄດ້ພຽງ 1 ວິຊາເທົ່ານັ້ນ)
    window.selectedCourses = [];

    courseCards.forEach(card => {
        card.addEventListener('click', () => {
            const isAlreadySelected = card.classList.contains('selected');

            courseCards.forEach(c => c.classList.remove('selected'));
            window.selectedCourses = []; 

            if (!isAlreadySelected) {
                card.classList.add('selected');

                const courseName = card.getAttribute('data-name') || 'ວິຊາຮຽນ';
                const coursePrice = parseFloat(card.getAttribute('data-price')) || 0;
                const courseTime = card.getAttribute('data-time') || '-';
                const courseDays = card.getAttribute('data-days') || '-';

                window.selectedCourses.push({ 
                    name: courseName, 
                    price: coursePrice, 
                    time: courseTime, 
                    days: courseDays 
                });
            }

            updateSummary();
            updateBadgeCounts();
        });
    });

    window.removeCourse = function(courseName) {
        window.selectedCourses = window.selectedCourses.filter(c => c.name !== courseName);
        courseCards.forEach(card => { if(card.getAttribute('data-name') === courseName) card.classList.remove('selected'); });
        updateSummary();
        updateBadgeCounts();
    };

    window.payCourse = function() {
        if (!window.selectedCourses || window.selectedCourses.length === 0) {
            alert('ກະລຸນາເລືອກວິຊາຮຽນກ່ອນຊຳລະຄ່າເທີມ!');
            return;
        }
        openQRModal();
    };

    window.closeQRModal = function() {
        const modal = document.getElementById('qrModal');
        if (modal) {
            modal.style.display = 'none';
        }
    };

    window.updateSummary = function() {
        const container = document.getElementById('selectedCoursesListContainer');
        if (!container) return;

        if (window.selectedCourses.length === 0) {
            container.innerHTML = '<p style="color: #64748b; font-size: 13px; text-align: center; padding: 10px;">ຍັງບໍ່ໄດ້ເລືອກວິຊາຮຽນ</p>';
            return;
        }

        container.innerHTML = '';
        window.selectedCourses.forEach((course) => {
            let div = document.createElement('div');
            div.className = 'selected-course-item';
            div.innerHTML = `
                <button type="button" class="delete-course-btn" onclick="removeCourse('${course.name}')" >
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <div class="selected-course-title">${course.name}</div>
                <div class="selected-course-price">ຄ່າຮຽນ ${course.price.toLocaleString()}ກີບ/ເທີມ</div>
                
                <div style="margin: 6px 0;">
                    ${course.paymentStatus || ''}
                </div>

                <div class="course-details-list">
                    <div class="course-detail-row">
                        <i class="fa-regular fa-clock"></i>
                        <span>ເວລາຮຽນ: <strong>${course.time}</strong></span>
                    </div>
                    <div class="course-detail-row">
                        <i class="fa-regular fa-calendar-days"></i>
                        <span>ຮຽນ: <strong>${course.days}</strong></span>
                    </div>
                </div>
            `;
            container.appendChild(div);
        });

        let totalSum = window.selectedCourses.reduce((sum, c) => sum + c.price, 0);
        let allPaid = window.selectedCourses.every(c => c.isPaid);

        let payActionDiv = document.createElement('div');
        payActionDiv.style.marginTop = '12px';
        payActionDiv.innerHTML = `
            <button type="button" class="btn-pay-course" onclick="payCourse()" style="width: 100%; padding: 10px; background-color: ${allPaid ? '#16a34a' : '#2563eb'}; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
                <i class="fa-solid fa-credit-card" style="margin-right: 5px;"></i> ${allPaid ? 'ໂອນເງິນແລ້ວ' : 'ຊຳລະຄ່າເທີມ (' + totalSum.toLocaleString() + ' ກີບ)'}
            </button>
        `;
        container.appendChild(payActionDiv);
    };

    // 4. ລະບົບສົ່ງຂໍ້ມູນໄປ Google Sheets
    const finalSubmitBtn = document.getElementById('finalSubmitBtn'); 
    if (finalSubmitBtn) {
        finalSubmitBtn.addEventListener('click', () => {
            if (window.selectedCourses.length === 0) {
                alert('ກະລຸນາເລືອກຢ່າງໜ້ອຍ 1 ວິຊາຮຽນກ່ອນບັນທຶກ!');
                return;
            }

            const studentName = document.querySelector('input[name="fullname"]')?.value || 'ບໍ່ໄດ້ລະບຸ';
            const school = document.querySelector('input[name="school"]')?.value || '';
            const provinceText = document.getElementById('provinceSelectedText')?.textContent || '';
            const districtText = document.getElementById('districtSelectedText')?.textContent || '';
            const province = provinceText.includes('ກະລຸນາ') ? '' : provinceText;
            const district = districtText.includes('ກະລຸນາ') ? '' : districtText;
            const whatsapp = document.querySelector('input[name="whatsapp"]')?.value || '';
            const facebook = document.querySelector('input[name="facebook"]')?.value || '';
            const courseName = window.selectedCourses.map(c => c.name).join(', ');
            const totalCoursePrice = window.selectedCourses.reduce((sum, c) => sum + c.price, 0);
            const coursePriceFormatted = totalCoursePrice.toLocaleString() + ' ກີບ';
            const noteInput = document.querySelector('input[name="note"]');
            const note = noteInput ? noteInput.value : '-';

            const formData = {
                studentName: studentName,
                school: school,
                province: province,
                district: district,
                whatsapp: whatsapp,
                facebook: facebook,
                courseName: courseName,          
                coursePrice: coursePriceFormatted, 
                note: note                     
            };

            const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzUbXASpDaA8Gw7iBbGHPpIxbhv_g-JfJjklIKuDEJ0A5V1IES5seA0UHCkp3aPe5A-/exec";

            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'form-overlay-box';
            loadingOverlay.id = 'formProcessingOverlay';
            loadingOverlay.innerHTML = `
                <div class="center-spinner"></div>
                <div style="color: #334155; font-size: 15px; font-weight: 500; margin-top: 10px;">ກຳລັງບັນທຶກຂໍ້ມູນ</div>
            `;
            document.body.appendChild(loadingOverlay);

            fetch(WEB_APP_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            setTimeout(() => {
                if (loadingOverlay) {
                    loadingOverlay.innerHTML = `
                        <div class="success-modal-card">
                            <div class="success-circle-large" style="margin-bottom: 15px;">
                                <i class="fa-solid fa-check"></i>
                            </div>
                            <div style="color: #1e293b; font-size: 16px; font-weight: 600;">ລົງທະບຽນສຳເລັດແລ້ວ</div>
                        </div>
                    `;
                }
            }, 500);

            setTimeout(() => {
                location.reload(); 
            }, 2000);
        });
    }
});

window.onclick = function(event) {
    if (!event.target.closest('.custom-dropdown')) {
        document.querySelectorAll('.dropdown-list').forEach(list => {
            list.style.display = 'none';
        });
    }
};

// --- ລະບົບການຊຳລະຄ່າເທີມ ແລະ ສົ່ງສະລິບ (ຮອງຮັບ Tesseract.js) ---

function openQRModal() {
    const modal = document.getElementById('qrModal');
    if (modal) {
        modal.style.display = 'flex';
        
        const qrSection = document.getElementById('qrSection');
        const uploadSlipSection = document.getElementById('uploadSlipSection');
        
        if (qrSection && uploadSlipSection) {
            qrSection.style.display = 'block';
            uploadSlipSection.style.display = 'none';
        }

        const slipFile = document.getElementById('slipFile');
        if (slipFile) {
            slipFile.value = '';
        }

        const submitBtn = document.getElementById('submitSlipBtn') || document.querySelector('.confirm-pay-btn');
        if (submitBtn) {
            submitBtn.style.backgroundColor = '#94a3b8';
            submitBtn.style.cursor = 'not-allowed';
            submitBtn.disabled = true;
            submitBtn.innerHTML = `ສົ່ງຮູບສະລິບໂອນເງິນ`;
        }
    }
}

function closeQRModal() {
    const modal = document.getElementById('qrModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function saveQRCode() {
    const loadingModal = document.getElementById('customLoadingModal');
    const loadingIconContainer = document.getElementById('loadingIconContainer');
    const loadingText = document.getElementById('loadingText');

    if (loadingModal) {
        loadingModal.style.display = 'flex';
        loadingIconContainer.innerHTML = `<div class="spinner-circle"></div>`;
        loadingText.innerHTML = `ກຳລັງບັນທຶກ<span class="dots"></span>`;
    }

    const imagePath = 'Logo/QR Code.png';
    const link = document.createElement('a');
    link.href = imagePath;
    link.download = 'QR_Code_Payment.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(function() {
        if (loadingIconContainer && loadingText) {
            loadingIconContainer.innerHTML = `<div class="success-check-circle">✓</div>`;
            loadingText.innerHTML = `ບັນທຶກຮູບສຳເລັດ`;
        }

        setTimeout(function() {
            if (loadingModal) {
                loadingModal.style.display = 'none';
            }

            const qrSection = document.getElementById('qrSection');
            const uploadSlipSection = document.getElementById('uploadSlipSection');

            if (qrSection && uploadSlipSection) {
                qrSection.style.display = 'none';
                uploadSlipSection.style.display = 'block';
            }
        }, 1000);

    }, 2500);
}

// 🚀 ຟັງຊັນອ່ານສະລິບແບບ Dynamic 100% ຜ່ານ Tesseract.js
function processSlipVerification(file) {
    const submitBtn = document.getElementById('submitSlipBtn') || document.querySelector('.confirm-pay-btn');
    if (!submitBtn) return;

    submitBtn.style.backgroundColor = '#94a3b8';
    submitBtn.style.cursor = 'not-allowed';
    submitBtn.disabled = true;
    submitBtn.innerHTML = `ກຳລັງອ່ານສະລິບດ້ວຍ AI<span class="dots"><span>.</span><span>.</span><span>.</span></span>`;

    // 1. ດຶງຄ່າເທີມຈາກວິຊາທີ່ຜູ້ໃຊ້ເລືອກຢູ່ປັດຈຸບັນແບບ Dynamic
    let coursePrice = 0;
    if (window.selectedCourses && window.selectedCourses.length > 0) {
        coursePrice = window.selectedCourses[0].price; // ໄດ້ລາຄາວິຊານັ້ນໆ ຕາມທີ່userກົດເລືອກ
    }

    // 2. ນຳໃຊ້ Tesseract.js ອ່ານຮູບສະລິບ (ຮອງຮັບ ພາສາອັງກິດ, ລາວ, ໄທ)
    Tesseract.recognize(
        file,
        'eng+lao+tha',
        { 
            logger: m => console.log(m.status),
            tessedit_ocr_engine_mode: 1 
        }
    ).then(({ data: { text } }) => {
        console.log("OCR Result:\n", text);

        let amountStr = parseAmountFromOCR(text);

        if (!amountStr) {
            alert("⚠️ ບໍ່ພົບຈຳນວນເງິນໃນສະລິບ, ກະລຸນາເລືອກຮູບສະລິບໃໝ່ທີ່ຊັດເຈນກວ່ານີ້");
            submitBtn.style.backgroundColor = '#94a3b8';
            submitBtn.style.cursor = 'not-allowed';
            submitBtn.disabled = true;
            submitBtn.innerHTML = `ສົ່ງຮູບສະລິບໂອນເງິນ`;
            return;
        }

        let transferredAmount = parseFloat(amountStr.replace(/,/g, ''));
        let remainingAmount = coursePrice - transferredAmount;

        // ກໍລະນີຈ່າຍເກີນຄ່າເທີມ
        if (transferredAmount > coursePrice) {
            showOverpaymentAlert();
            submitBtn.style.backgroundColor = '#94a3b8';
            submitBtn.style.cursor = 'not-allowed';
            submitBtn.disabled = true;
            submitBtn.innerHTML = `ສົ່ງຮູບສະລິບໂອນເງິນ`;
            return;
        }

        // 3. ອັບເດດສະຖານະການຊຳລະເງິນ
        window.selectedCourses.forEach(course => {
            if (transferredAmount === coursePrice) {
                course.paymentStatus = `<span style="color: #16a34a; font-weight: 600;">( <i class="fa-solid fa-circle-check"></i> ຈ່າຍແລ້ວ )</span>`;
                course.isPaid = true;
            } else {
                let formattedRemaining = remainingAmount.toLocaleString('en-US');
                course.paymentStatus = `<span style="color: #dc2626; font-weight: 600;">( ຍັງ ${formattedRemaining} ກີບ )</span>`;
                course.isPaid = false;
            }
        });

        submitBtn.style.backgroundColor = '#781134';
        submitBtn.style.cursor = 'pointer';
        submitBtn.disabled = false;
        submitBtn.innerHTML = `ໂອນເງິນແລ້ວ`;

    }).catch(err => {
        console.error(err);
        alert("❌ ເກີດຂໍ້ຜິດພາດໃນການອ່ານຮູບສະລິບ");
        submitBtn.style.backgroundColor = '#94a3b8';
        submitBtn.style.cursor = 'not-allowed';
        submitBtn.disabled = true;
        submitBtn.innerHTML = `ສົ່ງຮູບສະລິບໂອນເງິນ`;
    });
}

// ຟັງຊັນຊ່ວຍດึงຕົວເລກຈຳນວນເງິນຈາກຂໍ້ຄວາມ OCR
function parseAmountFromOCR(text) {
    let cleanText = text.replace(/\s+/g, ' ');
    let matches = cleanText.match(/\b\d{1,3}(?:,\d{3})+(?:\.\d{2})?\b/g);
    
    if (matches && matches.length > 0) {
        return matches[0]; 
    }
    return null;
}

// ຟັງຊັນສະແດງ Pop-up ແຈ້ງເຕືອນໂອນເກີນ ວາງທັບເທິງຮູບສະລິບ
function showOverpaymentAlert() {
    let existingAlert = document.getElementById('overpaymentPopup');
    if (existingAlert) existingAlert.remove();

    // ຊອກຫາສ່ວນຂອງກ່ອງສະລິບ ຫຼື DropZone ເພື່ອເອົາມາເປັນຈຸດອ້າງອີງຕຳແໜ່ງ
    const dropZone = document.getElementById('dropZone') || document.getElementById('uploadSlipSection');
    if (!dropZone) return;

    // ໃຫ້ DropZone ຕັ້ງຄ່າເປັນ relative ເພື່ອໃຫ້ກ່ອງແຈ້ງເຕືອນ (absolute) ຈັດຕຳແໜ່ງຢູ່ພາຍໃນໄດ້
    dropZone.style.position = 'relative';

    const alertBox = document.createElement('div');
    alertBox.id = 'overpaymentPopup';
    alertBox.style.cssText = `
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(255, 255, 255, 0.92);
        z-index: 50;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 20px;
        box-sizing: border-box;
        border-radius: 8px;
        animation: fadeIn 0.3s ease-out;
    `;

    alertBox.innerHTML = `
        <div style="width: 60px; height: 60px; background: #ffffff; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 12px; border: 2px solid #fee2e2;">
            <i class="fa-solid fa-triangle-exclamation" style="font-size: 28px; color: #dc2626;"></i>
        </div>
        <div style="font-weight: 600; color: #1e293b; font-size: 15px; margin-bottom: 6px;">ແຈ້ງເຕືອນການໂອນເງິນ</div>
        <div style="color: #64748b; font-size: 13px; max-width: 260px; line-height: 1.4;">ກະລຸນາກວດສະລິບໂອນຂອງທ່ານຄືນ! ໂອນເກີນຄ່າເທີມແລ້ວ</div>
    `;

    dropZone.appendChild(alertBox);

    // ໃຫ້ແຈ້ງເຕືອນເຊື່ອງຫາຍໄປเองຫຼັງຈາກ 4 ວິນາທີ (ຫຼືສາມາດກົດປິດ/ອັບໂຫຼດໃຫມ່ໄດ້)
    setTimeout(() => {
        if (alertBox) {
            alertBox.style.opacity = '0';
            alertBox.style.transition = 'opacity 0.5s ease';
            setTimeout(() => alertBox.remove(), 500);
        }
    }, 4000);
}

// ເມື່ອຜູ້ໃຊ້ກົດປຸ່ມຫຼັງຈາກກວດສອບສຳເລັດ
function submitSlip() {
    const submitBtn = document.getElementById('submitSlipBtn') || document.querySelector('.confirm-pay-btn');
    
    if (submitBtn && submitBtn.disabled) {
        alert("ກະລຸນາ ຖ້າໃຫ້ລະບົບກວດສອບສະລິບໃຫ້ສຳເລັດກ່ອນ!");
        return;
    }

    const slipFile = document.getElementById('slipFile');
    if (slipFile && slipFile.files.length > 0) {
        if (typeof updateSummary === 'function') {
            updateSummary();
        }
        closeQRModal();
    } else {
        alert("ກະລຸນາເລືອກຮູບສະລິບກ່ອນ!");
    }
}

function showImagePreview(file) {
    const dropzoneContent = document.getElementById('dropzoneContent');
    if (!dropzoneContent) return;

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            dropzoneContent.innerHTML = `
                <img src="${e.target.result}" alt="Slip Preview" style="width: 72%; height: 72%; object-fit: cover; border-radius: 4px;">
            `;
        }
        reader.readAsDataURL(file);
    }
}

// Event Listener ສຳລັບ Input File
const slipFile = document.getElementById('slipFile');
if (slipFile) {
    slipFile.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            showImagePreview(this.files[0]);
            processSlipVerification(this.files[0]); 
        }
    });
}

// Event Listener ສຳລັບ Drag and Drop
const dropZone = document.getElementById('dropZone');
if (dropZone && slipFile) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.style.backgroundColor = '#f1d4df';
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.style.backgroundColor = '#f9f9f9';
        }, false);
    });

    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files && files.length > 0) {
            slipFile.files = files;
            showImagePreview(files[0]);
            processSlipVerification(files[0]); 
        }
    }, false);
}