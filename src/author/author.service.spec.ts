import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorService } from './author.service';
import { Author } from './entity/author.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  find: jest.fn()
});


describe('AuthorService', () => {
  let service: AuthorService;
  let authorRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        { provide: getRepositoryToken(Author), useValue: createMockRepository()}
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
    authorRepository = module.get<MockRepository>(getRepositoryToken(Author));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('Should return array of results', async () => {
      const mockedData = [{id: 1, name: "Artem"}, {id: 2, name: "Olga"}];

      authorRepository.find.mockImplementation(() => mockedData);      

      const elements = await service.getAll({ limit: 20, offset: 0});

      expect(elements).toEqual(mockedData);
    });
  });

  describe('getOne', () => {
    it('Should return author, if he exists', async () => {
      const mockedData = [{id: 1, name: "Artem"}, {id: 2, name: "Olga"}];

      authorRepository.findOne.mockImplementation((id: number) => mockedData.find(elem => elem.id === id));      

      const element = await service.getOne(1);

      expect(element).toEqual(mockedData[0]);
    });
    it('Should throw error if author doesn\'t exists', async () => {
      const mockedData = [{id: 1, name: "Artem"}, {id: 2, name: "Olga"}];

      authorRepository.findOne.mockImplementation((id: number) => mockedData.find(elem => elem.id === id));      

      try {
        await service.getOne(3);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Author not found");
      }
    });
  });
});
