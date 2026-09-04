'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';

export interface Category {
  id: string;
  name: string;
}

interface CategoryComboboxProps {
  id: string,
  categories: Category[];
  value: string; // 선택된 categoryId
  onChange: (categoryId: string) => void;
  placeholder?: string;
}

export function CategoryCombobox({
  id,
  categories,
  value,
  onChange,
  placeholder = '카테고리를 검색하거나 선택하세요...',
}: CategoryComboboxProps) {
  // 현재 선택된 카테고리 객체 찾기
  const selectedCategory = categories.find((c) => c.id === value);

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  // 검색어에 따라 카테고리 필터링
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(value.toLowerCase())
  );

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 선택된 카테고리가 외부에서 변경될 때 input 값 동기화
  useEffect(() => {
    if (selectedCategory) {
      onChange(selectedCategory.name);
    } else if (!value) {
      onChange('');
    }
  }, [onChange, value, selectedCategory]);

  // 키보드 탐색 시 하이라이트된 항목이 스크롤 영역 밖으로 나가면 자동 스크롤
  useEffect(() => {
    if (isOpen && listboxRef.current) {
      const activeItem = listboxRef.current.children[highlightedIndex] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex, isOpen]);

  // 카테고리 선택 핸들러
  const handleSelect = (category: Category | null) => {
    if (category) {
      onChange(category.name);
    } else {
      onChange('');
    }
    setIsOpen(false);
  };

  // 키보드 이벤트 핸들러 (↑, ↓, Enter, Escape)
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true);
        return;
      }
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (filteredCategories.length > 0) {
          setHighlightedIndex((prev) => (prev + 1) % filteredCategories.length);
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (filteredCategories.length > 0) {
          setHighlightedIndex((prev) =>
            prev === 0 ? filteredCategories.length - 1 : prev - 1
          );
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (isOpen && filteredCategories[highlightedIndex]) {
          handleSelect(filteredCategories[highlightedIndex]);
        }
        break;

      case 'Escape':
        setIsOpen(false);
        break;

      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />

        {/* 선택 취소 (X) 버튼 */}
        {value && (
          <button
            type="button"
            onClick={() => handleSelect(null)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs p-1"
          >
            ✕
          </button>
        )}
      </div>

      {/* 드롭다운 목록 */}
      {isOpen && (
        <ul
          ref={listboxRef}
          className="absolute z-50 w-full mt-1.5 max-h-60 overflow-auto bg-white border border-gray-200 rounded-lg shadow-lg py-1 text-sm focus:outline-none"
        >
          {filteredCategories.length === 0 ? (
            <li className="px-3.5 py-2.5 text-gray-400 text-center">
              일치하는 카테고리가 없습니다
            </li>
          ) : (
            filteredCategories.map((category, index) => {
              const isSelected = category.id === value;
              const isHighlighted = index === highlightedIndex;

              return (
                <li
                  key={category.id}
                  onClick={() => handleSelect(category)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`px-3.5 py-2.5 cursor-pointer flex items-center justify-between transition-colors ${
                    isHighlighted ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                  }`}
                >
                  <span>{category.name}</span>
                  {isSelected && <span className="text-blue-600 font-bold">✓</span>}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
